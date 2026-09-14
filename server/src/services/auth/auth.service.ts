import { firebaseAuth } from "../../config/firebaseAdmin";
import { User } from "../../models/user.model";
import { generateAccessToken } from "../../utils/token.util";
import { generateRefreshToken } from "../../utils/token.util";
import { RefreshToken } from "../../models/refreshToken.model";
import crypto from "crypto";

export async function verifyFirebaseTokenAndUpsertUser(
  idToken: string,
  name: string,
) {
  const decoded = await firebaseAuth.verifyIdToken(idToken);

  const updateData: Record<string, unknown> = {
    firebaseUid: decoded.uid,
    email: decoded.email,
    emailVerified: decoded.email_verified ?? false,
  };

  if (name) {
    updateData.name = name;
  }

  const user = await User.findOneAndUpdate(
    { firebaseUid: decoded.uid },
    updateData,
    { upsert: true, returnDocument: "after" },
  );

  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    userId: user._id.toString(),
    role: user.role,
  });

  const tokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  RefreshToken.create({
    userId: user._id,
    tokenHash,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return { user, accessToken, refreshToken };
}
