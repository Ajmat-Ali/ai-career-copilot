import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "../../firebase-service-account.json";

initializeApp({
  credential: cert(
    serviceAccount as unknown as import("firebase-admin/app").ServiceAccount,
  ),
});

export const firebaseAuth = getAuth();
