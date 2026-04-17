export const civicRoles = [
  {
    title: "School Board",
    level: "Local",
    summary: "Sets district rules like calendars, many campus policies, and how schools run day to day.",
    power: [
      "Can change school policy, dress code, lunch rules, and district priorities.",
      "Usually easier for students and families to reach than state officials."
    ],
    bestFor: "School rules, local policies, and district-level concerns.",
  },
  {
    title: "City Council / Local Government",
    level: "Local",
    summary: "Handles city services like transportation, zoning, and some public resources.",
    power: [
      "Can improve things like transit access and local community support.",
      "Affects students outside school too."
    ],
    bestFor: "Transit, safety around school, and community access.",
  },
  {
    title: "State Representative",
    level: "Texas",
    summary: "Represents a district in the Texas House and votes on state laws.",
    power: [
      "Can shape education rules, school funding, and statewide policy.",
      "Often important when a problem affects many schools or the whole state."
    ],
    bestFor: "Phone policy, education rules, safety bills, and school funding.",
  },
  {
    title: "State Senator",
    level: "Texas",
    summary: "Represents a district in the Texas Senate and helps pass state laws.",
    power: [
      "Works with the House on statewide policy.",
      "Can influence issues that affect students across Texas."
    ],
    bestFor: "Statewide student issues, school policy, and legislation.",
  },
  {
    title: "Texas Governor",
    level: "Texas",
    summary: "Signs or vetoes state laws and shapes the overall direction of state government.",
    power: [
      "Can support or block major bills.",
      "Has influence, but does not write school rules alone."
    ],
    bestFor: "Large state-level changes and bill decisions.",
  },
  {
    title: "U.S. Representative",
    level: "Federal",
    summary: "Represents a district in the U.S. House and votes on federal laws.",
    power: [
      "Affects national policy, budgets, and federal programs.",
      "Usually not the first contact for school dress code or local campus rules."
    ],
    bestFor: "National education policy, grants, and federal issues.",
  },
  {
    title: "U.S. Senator",
    level: "Federal",
    summary: "Represents all of Texas in the U.S. Senate and votes on federal laws.",
    power: [
      "Represents the entire state.",
      "Useful for broader policy conversations."
    ],
    bestFor: "Federal laws that affect students, schools, and communities.",
  },
]

export const powerMap = [
  {
    title: "Usually most direct for school rules",
    body: "School board and district staff control many day-to-day policies students feel most directly."
  },
  {
    title: "Usually important for statewide rules",
    body: "Texas lawmakers matter when the issue affects many districts or requires a state law."
  },
  {
    title: "Usually important for national issues",
    body: "Congress matters when the issue is tied to federal laws, funding, or national programs."
  },
]
