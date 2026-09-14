import { verifyRefreshToken } from "../../utils/token.util";
import { RefreshToken } from "../../models/refreshToken.model";
import { AppError } from "../../utils/AppError";
import crypto from "crypto";
import { generateAccessToken } from "../../utils/token.util";
import { generateRefreshToken } from "../../utils/token.util";

export const refreshTokenService = async (oldRefreshToken: string) => {
  const decoded = verifyRefreshToken(oldRefreshToken);

  const oldTokenHash = crypto
    .createHash("sha256")
    .update(oldRefreshToken)
    .digest("hex");

  const existingToken = await RefreshToken.findOne({
    userId: decoded.userId,
    tokenHash: oldTokenHash,
  });

  if (!existingToken) {
    throw new AppError("Refresh token reuse detected or invalid", 401);
  }

  await existingToken.deleteOne();

  const accessToken = generateAccessToken({
    userId: decoded.userId,
    role: decoded.role,
  });

  const refreshToken = generateRefreshToken({
    userId: decoded.userId,
    role: decoded.role,
  });

  const newHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  await RefreshToken.create({
    userId: decoded.userId,
    tokenHash: newHash,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return { accessToken, refreshToken };
};
