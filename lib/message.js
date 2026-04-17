export function buildActionMessage({
  issueTitle = "this issue",
  name = "",
  location = "",
  impact = "",
  action = "",
}) {
  const lines = [
    "Hello,",
    "",
  ];

  const cleanName = name.trim();
  const cleanLocation = location.trim();
  if (cleanName && cleanLocation) {
    lines.push(`My name is ${cleanName}, and I am a student from ${cleanLocation}.`);
  } else if (cleanName) {
    lines.push(`My name is ${cleanName}, and I am a student who cares about this issue.`);
  } else if (cleanLocation) {
    lines.push(`I am a student from ${cleanLocation}.`);
  } else {
    lines.push("My name is [your name], and I am a student in your district.");
  }
  lines.push("");
  lines.push(`I am writing about ${issueTitle}.`);
  lines.push("");
  lines.push(
    impact.trim()
      ? `This has affected me or other students because ${impact.trim()}.`
      : "This has affected me or other students in a way that deserves attention."
  );
  lines.push("");
  lines.push(
    action.trim()
      ? `I respectfully ask that you ${action.trim().replace(/\.$/, "")}.`
      : "I respectfully ask that you take action on this issue."
  );
  lines.push("");
  lines.push("Thank you for your time and consideration.");

  return lines.join("\n");
}

export function buildEmailSubject(issueTitle = "this issue") {
  return `Concern about ${issueTitle}`;
}

export function buildMailtoLink(email, subject, body) {
  if (!email) return "";
  const query = new URLSearchParams({
    subject: subject || "",
    body: body || "",
  });
  return `mailto:${email}?${query.toString()}`;
}
