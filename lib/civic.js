const CACHE_PREFIX = "civicvoice-reps-cache:";
const CACHE_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

function isBrowser() {
  return typeof window !== "undefined";
}

function readCache(zip) {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(`${CACHE_PREFIX}${zip}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.timestamp || !parsed.data) return null;
    if (Date.now() - parsed.timestamp > CACHE_TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache(zip, data) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(
      `${CACHE_PREFIX}${zip}`,
      JSON.stringify({ timestamp: Date.now(), data })
    );
  } catch {
    // ignore cache errors
  }
}

export async function lookupRepresentatives(zip) {
  const cleaned = String(zip || "").trim();
  if (!/^[0-9]{5}$/.test(cleaned)) {
    throw new Error("Enter a valid 5-digit ZIP code.");
  }

  const cached = readCache(cleaned);
  if (cached) return cached;

  const response = await fetch(`/api/representatives?zip=${encodeURIComponent(cleaned)}`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || data.message || "Unable to load representatives.");
  }

  writeCache(cleaned, data);
  return data;
}
