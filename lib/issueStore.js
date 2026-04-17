const ISSUE_VOTE_KEY = "civicvoice-issue-votes-v2";
const ISSUE_SUGGESTION_KEY = "civicvoice-issue-suggestions-v2";
const CUSTOM_REP_KEY = "civicvoice-custom-reps-v2";

function isBrowser() {
  return typeof window !== "undefined";
}

function readJSON(key, fallback) {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage failures
  }
}

export function loadIssueVotes() {
  return readJSON(ISSUE_VOTE_KEY, {});
}

export function saveIssueVotes(votes) {
  writeJSON(ISSUE_VOTE_KEY, votes);
}

export function castIssueVote(issueId, userId) {
  if (!issueId) throw new Error("Missing issue id.");
  if (!userId) throw new Error("You must be signed in to vote.");

  const votes = loadIssueVotes();
  const item = votes[issueId] || { count: 0, voters: [] };

  if ((item.voters || []).includes(userId)) {
    return { ok: false, alreadyVoted: true, count: item.count || 0 };
  }

  const next = {
    count: Number(item.count || 0) + 1,
    voters: [...(item.voters || []), userId],
  };

  votes[issueId] = next;
  saveIssueVotes(votes);
  return { ok: true, alreadyVoted: false, count: next.count };
}

export function loadIssueSuggestions() {
  return readJSON(ISSUE_SUGGESTION_KEY, []);
}

export function saveIssueSuggestion(suggestion) {
  const items = loadIssueSuggestions();
  const next = [
    {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...suggestion,
    },
    ...items,
  ].slice(0, 50);
  writeJSON(ISSUE_SUGGESTION_KEY, next);
  return next[0];
}

export function loadCustomRepsByZip(zip) {
  const store = readJSON(CUSTOM_REP_KEY, {});
  return Array.isArray(store?.[zip]) ? store[zip] : [];
}

export function saveCustomRepForZip(zip, rep) {
  const cleanZip = String(zip || "").trim();
  if (!/^\d{5}$/.test(cleanZip)) throw new Error("Enter a valid 5-digit ZIP code.");
  const store = readJSON(CUSTOM_REP_KEY, {});
  const entry = {
    id: crypto.randomUUID(),
    name: String(rep?.name || "").trim(),
    role: String(rep?.role || "").trim(),
    party: String(rep?.party || "").trim(),
    email: String(rep?.email || "").trim(),
    phone: String(rep?.phone || "").trim(),
    url: String(rep?.url || "").trim(),
    notes: String(rep?.notes || "").trim(),
    createdAt: new Date().toISOString(),
    source: "manual",
  };

  if (!entry.name || !entry.role) {
    throw new Error("Add a name and role before saving.");
  }

  const current = Array.isArray(store[cleanZip]) ? store[cleanZip] : [];
  const next = [entry, ...current].slice(0, 20);
  store[cleanZip] = next;
  writeJSON(CUSTOM_REP_KEY, store);
  return entry;
}
