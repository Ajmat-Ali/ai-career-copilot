import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/token.util";

import { AppError } from "../utils/AppError";

const protect = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AppError("Not authenticated", 401));
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyAccessToken(token as string);

    req.user = decoded;
    next();
  } catch (error) {
    next(new AppError("Invalid or expired token", 401));
  }
};
