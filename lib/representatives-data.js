export const FRISCO_ZIPS = new Set([
  "75033",
  "75034",
  "75035",
  "75036",
  "75056",
]);

const FRISCO_REPS = [
  {
    id: "dynette-davis",
    name: "Dynette Davis",
    level: "School-level",
    role: "President, Frisco ISD Board of Trustees (Place 4)",
    email: "davisdy@friscoisd.org",
    phone: "",
    url: "",
    party: "",
    source: "local",
    notes:
      "Helps lead the district’s policy-making body. Best for district-wide cell phone policy, student code of conduct, discipline rules, technology use rules, and concerns affecting all schools in Frisco ISD.",
    topics: [
      "District-wide cell phone policy",
      "Student code of conduct",
      "Discipline rules",
      "Technology use rules",
      "Concerns that affect all schools in Frisco ISD",
    ],
    messageHint: "Use for district-wide policy and board-level concerns.",
  },
  {
    id: "keith-maddox",
    name: "Keith Maddox",
    level: "School-level",
    role: "Vice President, Frisco ISD Board of Trustees (Place 7)",
    email: "maddoxk@friscoisd.org",
    phone: "",
    url: "",
    party: "",
    source: "local",
    notes:
      "District policy, governance, student-related rules, budget decisions, and oversight of district leadership.",
    topics: [
      "Changing a district rule",
      "Advocating for more student input",
      "School-wide or district-wide student concerns",
    ],
    messageHint: "Use for board governance and student input.",
  },
  {
    id: "mark-hill",
    name: "Mark Hill",
    level: "School-level",
    role: "Secretary, Frisco ISD Board of Trustees (Place 5)",
    email: "hillmark@friscoisd.org",
    phone: "",
    url: "",
    party: "",
    source: "local",
    notes: "District governance and policy as part of the board.",
    topics: [
      "Student handbook issues",
      "Device/phone restrictions",
      "School discipline concerns",
      "Policy changes affecting all students",
    ],
    messageHint: "Use for handbook and policy concerns.",
  },
  {
    id: "suresh-manduva",
    name: "Suresh Manduva",
    level: "School-level",
    role: "Frisco ISD Board Trustee (Place 1)",
    email: "manduvas@friscoisd.org",
    phone: "",
    url: "",
    party: "",
    source: "local",
    notes:
      "District policies, budgets, oversight, student and personnel appeals, and strategic direction with the board.",
    topics: [
      "Requests for district policy updates",
      "Student rights/voice concerns",
      "Changes to school technology expectations",
    ],
    messageHint: "Use for district policy updates and student voice.",
  },
  {
    id: "renee-sample",
    name: "Renee Sample",
    level: "School-level",
    role: "Frisco ISD Board Trustee (Place 2)",
    email: "sampler@friscoisd.org",
    phone: "",
    url: "",
    party: "",
    source: "local",
    notes: "District policy-making and governance with the board.",
    topics: [
      "District-level student policy concerns",
      "Advocacy for student wellness and school rules",
      "Student voice in decision-making",
    ],
    messageHint: "Use for student wellness and school rules.",
  },
  {
    id: "stephanie-elad",
    name: "Stephanie Elad",
    level: "School-level",
    role: "Frisco ISD Board Trustee (Place 3)",
    email: "elads@friscoisd.org",
    phone: "",
    url: "",
    party: "",
    source: "local",
    notes: "District policies, governance, district priorities, and board decisions.",
    topics: [
      "School rule changes",
      "Student concerns affecting multiple campuses",
      "Issues students want discussed at board meetings",
    ],
    messageHint: "Use for multi-campus concerns.",
  },
  {
    id: "sherrie-salas",
    name: "Sherrie Salas",
    level: "School-level",
    role: "Frisco ISD Board Trustee (Place 6)",
    email: "salass@friscoisd.org",
    phone: "",
    url: "",
    party: "",
    source: "local",
    notes: "District-wide policies and governance as part of the school board.",
    topics: [
      "District policy concerns",
      "Student advocacy topics",
      "Communication about school-wide rules",
    ],
    messageHint: "Use for school-wide rule and advocacy concerns.",
  },
  {
    id: "mike-waldrip",
    name: "Dr. Mike Waldrip",
    level: "School-level",
    role: "Superintendent of Frisco ISD",
    email: "leaders@friscoisd.org",
    phone: "",
    url: "",
    party: "",
    source: "local",
    notes:
      "The district’s top administrator. Best for district implementation of policies, concerns affecting multiple schools, district-wide student programs, and operational concerns.",
    topics: [
      "District implementation of policies",
      "Concerns affecting multiple schools",
      "District-wide student programs",
      "Operational concerns about how rules are enforced",
    ],
    messageHint: "Use for district-wide implementation and operations.",
  },
];

const TEXAS_REPS = [
  {
    id: "angela-paxton",
    name: "Angela Paxton",
    level: "State-level",
    role: "Texas State Senator, District 8",
    email: "angela.paxton@senate.texas.gov",
    phone: "",
    url: "",
    party: "",
    source: "local",
    notes:
      "Serves in the Texas Senate and helps shape statewide laws and policies, especially education-related policy.",
    topics: [
      "A Texas-wide law about student phone use",
      "Education funding",
      "State testing or graduation rules",
      "School safety laws",
      "Statewide student rights or school policy changes",
    ],
    messageHint: "Use for statewide education policy.",
  },
  {
    id: "brent-hagenbuch",
    name: "Brent Hagenbuch",
    level: "State-level",
    role: "Texas State Senator, District 30",
    email: "brent.hagenbuch@senate.texas.gov",
    phone: "",
    url: "",
    party: "",
    source: "local",
    notes:
      "Serves in the Texas Senate and sits on committees including Education K-16, Transportation, Criminal Justice, Veteran Affairs, and Nominations.",
    topics: [
      "Statewide school discipline or phone-use laws",
      "Education policy affecting all Texas students",
      "Changes to public school rules across districts",
    ],
    messageHint: "Use for statewide school policy.",
  },
  {
    id: "jared-patterson",
    name: "Jared Patterson",
    level: "State-level",
    role: "Texas State Representative, House District 106",
    email: "jared.patterson@house.texas.gov",
    phone: "",
    url: "",
    party: "",
    source: "local",
    notes:
      "Represents District 106 in the Texas House of Representatives.",
    topics: [
      "Proposing/supporting a Texas House bill on school phone use",
      "State education law changes",
      "School funding or policy concerns that need state legislation",
    ],
    messageHint: "Use for House legislation and funding concerns.",
  },
  {
    id: "matt-shaheen",
    name: "Matt Shaheen",
    level: "State-level",
    role: "Texas State Representative, House District 66",
    email: "matt.shaheen@house.texas.gov",
    phone: "",
    url: "",
    party: "",
    source: "local",
    notes:
      "Represents District 66 in the Texas House. The district includes parts of Frisco after redistricting.",
    topics: [
      "Statewide education bills",
      "Rules affecting public schools across Texas",
      "Technology/device legislation for students",
    ],
    messageHint: "Use for statewide education bills.",
  },
  {
    id: "keresa-richardson",
    name: "Keresa Richardson",
    level: "State-level",
    role: "Texas State Representative, House District 61",
    email: "keresa.richardson@house.texas.gov",
    phone: "",
    url: "",
    party: "",
    source: "local",
    notes:
      "Current representative for District 61 and elected in 2024.",
    topics: [
      "State laws that affect students and schools",
      "Broader education concerns",
      "Advocacy for state-level student policy changes",
    ],
    messageHint: "Use for state-level student policy changes.",
  },
];

function isValidZip(zip) {
  return /^\d{5}$/.test(zip);
}

export function getRepresentativesByZip(zip) {
  if (!isValidZip(zip)) {
    return {
      zip,
      state: "Texas",
      normalizedAddress: "",
      representatives: [],
      error: "A valid 5-digit ZIP code is required.",
    };
  }

  const schoolReps = FRISCO_ZIPS.has(zip) ? FRISCO_REPS : [];
  const representatives = [...schoolReps, ...TEXAS_REPS];

  return {
    zip,
    state: "Texas",
    normalizedAddress: FRISCO_ZIPS.has(zip)
      ? "Frisco ISD / Texas coverage"
      : "Texas coverage",
    representatives,
  };
}