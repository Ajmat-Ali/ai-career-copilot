import crypto from "crypto";
import { RefreshToken } from "../../models/refreshToken.model";

export async function logoutService(refreshToken: string) {
  const tokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");
  await RefreshToken.deleteOne({ tokenHash });
}
