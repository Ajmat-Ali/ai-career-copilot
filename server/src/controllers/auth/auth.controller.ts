import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/AppError";
import { verifyFirebaseTokenAndUpsertUser } from "../../services/auth/auth.service";
import { env } from "../../config/env";

export const sessionHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { idToken, name } = req.body;

    if (!idToken) {
      return next(new AppError("idToken is required", 400));
    }

    const { user, accessToken, refreshToken } =
      await verifyFirebaseTokenAndUpsertUser(idToken, name);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, data: { user, accessToken } });
  } catch (error) {
    next(error);
  }
};
