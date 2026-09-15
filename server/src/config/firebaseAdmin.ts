import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { env } from "../config/env";

const formatPrivateKey = (key: string | undefined) => {
  if (!key) return undefined;
  return key
    .replace(/\\n/g, "\n")
    .replace(/^["']|["']$/g, "")
    .trim();
};

initializeApp({
  credential: cert({
    projectId: env.FIREBASE_PROJECT_ID,
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
    privateKey: formatPrivateKey(env.FIREBASE_PRIVATE_KEY) ?? "",
  }),
});

export const firebaseAuth = getAuth();
