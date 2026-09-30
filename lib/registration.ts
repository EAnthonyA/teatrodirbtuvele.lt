export type Registration = {
  childName: string;
  childSurname: string;
  age: number;
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
  const age = Number(data.age);
  const parentEmail = cleanText(data.parentEmail).toLowerCase();
  const parentPhone = cleanText(data.parentPhone);
  const website = cleanText(data.website);

  if (website || !namePattern.test(childName) || !namePattern.test(childSurname)) return { valid: false };
  if (!Number.isInteger(age) || age < 5 || age > 18) return { valid: false };
  if (parentEmail.length > 254 || !emailPattern.test(parentEmail)) return { valid: false };
  if (parentPhone.length > 40 || parentPhone.replace(/[^0-9]/g, "").length < 7) return { valid: false };

  return {
    valid: true,
    registration: { childName, childSurname, age, parentEmail, parentPhone },
  };
}

export function registrationEmailText(registration: Omit<Registration, "website">) {
  return [
    "Nauja Teatro dirbtuvėlės registracijos užklausa",
    "",
    `Vaikas: ${registration.childName} ${registration.childSurname}`,
    `Vaiko amžius: ${registration.age} m.`,
    `Tėvų / globėjų el. paštas: ${registration.parentEmail}`,
    `Tėvų / globėjų telefonas: ${registration.parentPhone}`,
  ].join("\n");
}
