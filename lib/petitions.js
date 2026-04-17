import { db } from "./firebase";
import { starterPetitions } from "./seed";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  setDoc,
  updateDoc,
  addDoc,
  serverTimestamp,
  runTransaction,
} from "firebase/firestore";

const STORAGE_KEY = "civicvoice-petitions";
const VOTE_KEY = "civicvoice-votes";

function isBrowser() {
  return typeof window !== "undefined";
}

function readLocal(key, fallback = []) {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocal(key, value) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage failures
  }
}

function normalizeStatus(count = 0) {
  if (count >= 25) return "Approved";
  if (count >= 10) return "Ready for review";
  return "Open";
}

function normalizePetition(petition) {
  if (!petition) return null;
  const supportCount = Number(petition.supportCount ?? petition.signatures ?? 0) || 0;
  return {
    ...petition,
    supportCount,
    status: petition.status || normalizeStatus(supportCount),
  };
}

export async function getPetitions() {
  if (db) {
    try {
      const snapshot = await getDocs(collection(db, "petitions"));
      const items = snapshot.docs.map((d) => normalizePetition({ id: d.id, ...d.data() })).filter(Boolean);
      return items.length ? items : starterPetitions.map((p) => normalizePetition({ ...p }));
    } catch {
      return starterPetitions.map((p) => normalizePetition({ ...p }));
    }
  }

  const local = readLocal(STORAGE_KEY, []);
  if (local.length) return local.map(normalizePetition).filter(Boolean);
  return starterPetitions.map((p) => normalizePetition({ ...p }));
}

export async function createPetition({ title, issue, description, authorEmail = "" }) {
  const cleanTitle = String(title || "").trim();
  const cleanDescription = String(description || "").trim();
  const cleanIssue = String(issue || "").trim();

  if (!cleanTitle) throw new Error("Add a title for your proposal.");
  if (!cleanDescription) throw new Error("Add a short description.");
  if (!cleanIssue) throw new Error("Pick an issue category.");

  const created = {
    title: cleanTitle,
    issue: cleanIssue,
    description: cleanDescription,
    supportCount: 0,
    status: "Open",
    authorEmail,
    createdAt: Date.now(),
  };

  if (db) {
    const ref = await addDoc(collection(db, "petitions"), {
      ...created,
      createdAt: serverTimestamp(),
    });
    return { id: ref.id, ...created };
  }

  const local = readLocal(STORAGE_KEY, []);
  const item = { id: crypto.randomUUID(), ...created };
  writeLocal(STORAGE_KEY, [item, ...local]);
  return item;
}

function voteStore() {
  return readLocal(VOTE_KEY, {});
}

function writeVoteStore(store) {
  writeLocal(VOTE_KEY, store);
}

export async function signPetition(id, userId) {
  if (!id) throw new Error("Missing petition id.");
  if (!userId) throw new Error("You must be signed in to support a proposal.");

  if (db) {
    const petitionRef = doc(db, "petitions", id);
    const voteRef = doc(db, "petitionVotes", `${id}_${userId}`);

    await runTransaction(db, async (transaction) => {
      const voteSnap = await transaction.get(voteRef);
      if (voteSnap.exists()) {
        throw new Error("You have already supported this proposal.");
      }

      const petitionSnap = await transaction.get(petitionRef);
      if (!petitionSnap.exists()) {
        throw new Error("Petition not found.");
      }

      const current = Number(petitionSnap.data().supportCount || 0);
      const next = current + 1;

      transaction.set(voteRef, {
        petitionId: id,
        userId,
        createdAt: serverTimestamp(),
      });

      transaction.update(petitionRef, {
        supportCount: increment(1),
        status: normalizeStatus(next),
      });
    });

    return;
  }

  const votes = voteStore();
  const votedFor = Array.isArray(votes[id]) ? votes[id] : [];
  if (votedFor.includes(userId)) {
    throw new Error("You have already supported this proposal.");
  }

  const local = readLocal(STORAGE_KEY, []);
  const next = local.map((pet) => {
    if (pet.id !== id) return pet;
    const count = Number(pet.supportCount || 0) + 1;
    return { ...pet, supportCount: count, status: normalizeStatus(count) };
  });

  votes[id] = [...votedFor, userId];
  writeVoteStore(votes);
  writeLocal(STORAGE_KEY, next);
}

export function normalizePetitionsForDisplay(items) {
  return (Array.isArray(items) ? items : []).map(normalizePetition).filter(Boolean);
}
