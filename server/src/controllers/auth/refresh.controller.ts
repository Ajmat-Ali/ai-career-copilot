import { NextFunction, Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { refreshTokenService } from "../../services/auth/refresh.service";
import { env } from "../../config/env";

export const refreshHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const oldRefreshToken = req.cookies?.refreshToken;

    if (!oldRefreshToken) {
      return next(new AppError("No refresh token provided", 401));
    }

    const { accessToken, refreshToken } =
      await refreshTokenService(oldRefreshToken);

    res.cookie("refreshToken", refreshToken, {
      sameSite: env.NODE_ENV === "production" ? "none" : "lax",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: env.NODE_ENV === "production",
    });

    res.status(200).json({ success: true, data: { accessToken } });
  } catch (error) {
    next(error);
  }
};
