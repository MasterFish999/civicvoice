const CIVIC_API_URL = "https://www.googleapis.com/civicinfo/v2/representatives";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const zip = searchParams.get("zip");

  if (!zip || !/^\d{5}$/.test(zip)) {
    return Response.json({ error: "A valid 5-digit ZIP code is required." }, { status: 400 });
  }

  const apiKey = process.env.CIVIC_API_KEY;
  if (apiKey) {
    try {
      const civicUrl = new URL(CIVIC_API_URL);
      civicUrl.searchParams.set("address", zip);
      civicUrl.searchParams.set("key", apiKey);

      const response = await fetch(civicUrl.toString(), {
        headers: { Accept: "application/json" },
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error?.message || data.error || "Civic lookup failed.");
      }

      return Response.json(normalizeCivicResponse(data, zip));
    } catch (err) {
      // Fall through to Texas fallback.
    }
  }

  const texasFallback = texasFallbackResponse(zip);
  if (texasFallback) {
    return Response.json(texasFallback);
  }

  return Response.json(
    { error: "Representative lookup is only available for Texas ZIPs without a Civic API key." },
    { status: 404 }
  );
}

function normalizeCivicResponse(data, zip) {
  const officials = Array.isArray(data.officials) ? data.officials : [];
  const offices = Array.isArray(data.offices) ? data.offices : [];

  const representatives = offices.flatMap((office) => {
    const names = Array.isArray(office.officialIndices) ? office.officialIndices : [];
    return names.map((index) => {
      const official = officials[index] || {};
      const address = Array.isArray(official.address) && official.address[0] ? official.address[0] : {};
      return {
        name: official.name || office.name || "Official",
        role: office.name || "Representative",
        party: official.party || "",
        phones: official.phones || [],
        emails: official.emails || [],
        urls: official.urls || [],
        photoUrl: official.photoUrl || "",
        address: address
          ? [address.line1, address.line2, address.city, address.state, address.zip]
              .filter(Boolean)
              .join(", ")
          : "",
      };
    });
  });

  return {
    zip,
    state: data.normalizedInput?.state || "Texas",
    normalizedAddress: data.normalizedInput?.line1 || data.normalizedInput?.city || "Texas",
    representatives: dedupeRepresentatives(representatives),
  };
}

function dedupeRepresentatives(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = `${item.name}::${item.role}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function texasFallbackResponse(zip) {
  const txRanges = [
    [75000, 79999],
    [73300, 73399],
    [88500, 88599],
  ];
  const z = Number(zip);
  const isTexas = txRanges.some(([min, max]) => z >= min && z <= max);
  if (!isTexas) return null;

  return {
    zip,
    state: "Texas",
    normalizedAddress: "Texas fallback contacts",
    representatives: [
      {
        name: "Greg Abbott",
        role: "Governor of Texas",
        party: "Republican",
        phones: ["512-463-2000"],
        emails: [],
        urls: ["https://gov.texas.gov"],
      },
      {
        name: "Dan Patrick",
        role: "Lieutenant Governor of Texas",
        party: "Republican",
        phones: ["512-463-0001"],
        emails: [],
        urls: ["https://www.ltgov.texas.gov"],
      },
      {
        name: "Ken Paxton",
        role: "Attorney General of Texas",
        party: "Republican",
        phones: ["512-463-2100"],
        emails: [],
        urls: ["https://texasattorneygeneral.gov"],
      },
      {
        name: "John Cornyn",
        role: "U.S. Senator",
        party: "Republican",
        phones: ["202-224-2934"],
        emails: [],
        urls: ["https://www.cornyn.senate.gov"],
      },
      {
        name: "Ted Cruz",
        role: "U.S. Senator",
        party: "Republican",
        phones: ["202-224-5922"],
        emails: [],
        urls: ["https://www.cruz.senate.gov"],
      },
    ],
  };
}
