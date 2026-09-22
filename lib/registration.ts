export type Registration = {
  childName: string;
  childSurname: string;
  ageGroup: "5-11" | "12-18";
  parentEmail: string;
  parentPhone: string;
  website?: string;
};

type ValidationResult =
  | { valid: true; registration: Omit<Registration, "website"> }
  | { valid: false };

const namePattern = /^[\p{L}\p{M}][\p{L}\p{M}'’ -]{0,59}$/u;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

export function validateRegistration(input: unknown): ValidationResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { valid: false };
  const data = input as Record<string, unknown>;
  const childName = cleanText(data.childName);
  const childSurname = cleanText(data.childSurname);
  const ageGroup = data.ageGroup;
  const parentEmail = cleanText(data.parentEmail).toLowerCase();
  const parentPhone = cleanText(data.parentPhone);
  const website = cleanText(data.website);

  if (website || !namePattern.test(childName) || !namePattern.test(childSurname)) return { valid: false };
  if (ageGroup !== "5-11" && ageGroup !== "12-18") return { valid: false };
  if (parentEmail.length > 254 || !emailPattern.test(parentEmail)) return { valid: false };
  if (parentPhone.length > 40 || parentPhone.replace(/[^0-9]/g, "").length < 7) return { valid: false };

  return {
    valid: true,
    registration: { childName, childSurname, ageGroup, parentEmail, parentPhone },
  };
}

export function registrationEmailText(registration: Omit<Registration, "website">) {
  const ageGroup = registration.ageGroup === "5-11" ? "5–11 metų" : "12–18 metų";
  return [
    "Nauja Teatro dirbtuvėlės registracijos užklausa",
    "",
    `Vaikas: ${registration.childName} ${registration.childSurname}`,
    `Amžiaus grupė: ${ageGroup}`,
    `Tėvų / globėjų el. paštas: ${registration.parentEmail}`,
    `Tėvų / globėjų telefonas: ${registration.parentPhone}`,
  ].join("\n");
}
