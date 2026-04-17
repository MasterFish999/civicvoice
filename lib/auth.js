import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const googleProvider = auth ? new GoogleAuthProvider() : null;
if (googleProvider) {
  googleProvider.setCustomParameters({ prompt: "select_account" });
}

export function listenToAuth(callback) {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

export async function signInWithGoogle() {
  if (!auth) {
    throw new Error("Firebase Auth is not configured yet.");
  }
  return signInWithPopup(auth, googleProvider);
}

export async function signInWithEmail(email, password) {
  if (!auth) {
    throw new Error("Firebase Auth is not configured yet.");
  }
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signUpWithEmail(email, password) {
  if (!auth) {
    throw new Error("Firebase Auth is not configured yet.");
  }
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function logOut() {
  if (!auth) return;
  return signOut(auth);
}
