export const topics = [
  {
    id: "phone-policy",
    category: "School Policy",
    title: "Cell Phone Use During Class",
    summary:
      "Texas schools are tightening cell phone rules, and students want policies that protect learning without ignoring safety, family communication, or accessibility needs.",
    why: [
      "Students need to know when devices are allowed and when they are not.",
      "Overly strict rules can make it harder to manage family updates, emergencies, or accessibility tools.",
      "A fair policy should be clear, consistent, and easy to explain to students and parents.",
    ],
    contact: "School board members, district leaders, and your state representative",
    action:
      "Ask for a balanced policy that keeps class focused while still allowing reasonable access for safety and accessibility.",
    texasContext:
      "Texas HB 1481 requires school district and open-enrollment charter school policies that prohibit students from using personal wireless communication devices during instructional time.",
    billRefs: ["HB 1481"],
    incidentRefs: ["Texas legislative debate over classroom phone use"],
    officeLevels: ["School board", "District leaders", "State representative"],
    templates: [
      "Please support a balanced cell phone policy that keeps students focused while still allowing reasonable access for safety and family communication.",
      "I am a Texas student and I believe device rules should be clear, fair, and easy to follow.",
      "Please consider student input before making phone restrictions even stricter.",
    ],
  },
  {
    id: "library-materials",
    category: "Education",
    title: "School Library Books and Materials",
    summary:
      "Texas school libraries have become a major policy fight. Students are debating how to balance parent concerns, review rules, and access to books.",
    why: [
      "Students should be able to access age-appropriate books and learning materials.",
      "Rules about ratings and reviews can change what stays on shelves.",
      "A good policy should protect students without turning libraries into political battlegrounds.",
    ],
    contact: "School board members, district librarians, and state education leaders",
    action:
      "Ask for library rules that keep materials accessible, transparent, and based on clear standards.",
    texasContext:
      "HB 900, the READER Act, created Texas rules for rating and reviewing public school library materials.",
    billRefs: ["HB 900"],
    incidentRefs: ["Texas school library rating and challenge debates"],
    officeLevels: ["School board", "District librarians", "State education leaders"],
    templates: [
      "Please support library policies that keep books available while using clear, fair review standards.",
      "Students should not lose access to useful books because of confusing or overly broad rules.",
      "I would like decision-makers to protect library access and transparency at the same time.",
    ],
  },
  {
    id: "school-safety",
    category: "Safety",
    title: "School Safety and Security",
    summary:
      "Students want safer campuses, but they also want policies that actually help instead of just adding fear or stress.",
    why: [
      "Safety plans matter most when they are realistic and actually practiced.",
      "Students also need counseling, communication, and emergency readiness.",
      "Physical security should go together with mental health support and prevention.",
    ],
    contact: "School board members, district safety staff, and your state representative",
    action:
      "Ask for practical safety improvements, better communication, and more support services for students.",
    texasContext:
      "HB 121 focuses on public school safety, including TEA peace officers, school safety requirements, and related resources. The Robb Elementary shooting in Uvalde on May 24, 2022 remains a major reason families push for change.",
    billRefs: ["HB 121"],
    incidentRefs: ["Robb Elementary School shooting in Uvalde"],
    officeLevels: ["School board", "District safety staff", "State representative"],
    templates: [
      "Please support school safety plans that improve preparedness, communication, and student support together.",
      "I want safety policies that actually make students safer, not just policies that look strong on paper.",
      "Please include counselors and prevention, not only security hardware.",
    ],
  },
  {
    id: "mental-health",
    category: "Health & Wellness",
    title: "Student Mental Health Support",
    summary:
      "Students keep asking for better counseling access, faster support, and fewer barriers when they need help.",
    why: [
      "Mental health affects attendance, learning, and safety.",
      "Students often do not know where to go when they need help.",
      "Counseling support works best when it is easy to reach and clearly explained.",
    ],
    contact: "School counselors, campus administration, and district leaders",
    action:
      "Ask for more counseling access, easier referral systems, and better communication about support services.",
    texasContext:
      "The Uvalde aftermath turned mental health and prevention into a major Texas school issue, especially for families who want support before a crisis happens.",
    billRefs: ["School safety / student support proposals"],
    incidentRefs: ["Robb Elementary School shooting in Uvalde"],
    officeLevels: ["School counselors", "Campus leaders", "District leaders"],
    templates: [
      "Please improve access to counseling and student support before problems become emergencies.",
      "Students need clear, easy ways to ask for help.",
      "Mental health support should be treated as part of school safety.",
    ],
  },
  {
    id: "dress-code",
    category: "School Policy",
    title: "Dress Codes and Student Expression",
    summary:
      "Dress codes can help set standards, but they can also become inconsistent or unfair if students are punished unevenly.",
    why: [
      "Students want rules that are understandable and applied consistently.",
      "Dress code enforcement can affect confidence and attendance.",
      "Policies should not single out students unfairly.",
    ],
    contact: "School board members and campus administration",
    action:
      "Ask for a clearer, more consistent dress code that focuses on learning and fairness.",
    texasContext:
      "Dress code rules are usually local, so Texas students often have the most influence at the school board or campus level.",
    billRefs: [],
    incidentRefs: ["Local school dress code complaints"],
    officeLevels: ["School board", "Campus administration"],
    templates: [
      "Please make the dress code clearer and more consistent for students.",
      "Students should not be punished unevenly for the same clothing choices.",
      "I would like a policy that focuses on learning and fairness.",
    ],
  },
  {
    id: "student-transport",
    category: "Access",
    title: "Student Transportation and Access",
    summary:
      "Transportation affects attendance, after-school participation, and whether students can actually get to the resources they need.",
    why: [
      "Not every student has the same transportation options.",
      "Late buses, route gaps, and long commutes can block access to school activities.",
      "Local transportation decisions can have a real effect on students every day.",
    ],
    contact: "District transportation staff, school board members, and city leaders",
    action:
      "Ask for better route planning, safer stops, and more access after school.",
    texasContext:
      "Transportation problems are usually solved locally first, so Texas students should start with the district and city officials who control routes and budgets.",
    billRefs: [],
    incidentRefs: ["Bus route delays and missed after-school access"],
    officeLevels: ["District transportation staff", "School board", "City leaders"],
    templates: [
      "Please improve student transportation routes so students can reliably get to school and activities.",
      "Transportation should not be a barrier to participation.",
      "I would like safer and more predictable bus access for students.",
    ],
  },
];

export const featuredTopicIds = [
  "phone-policy",
  "library-materials",
  "school-safety",
  "mental-health",
];

export function getTopicBySlug(slug) {
  return topics.find((topic) => topic.id === slug);
}
