"use client";

import { FormEvent, useMemo, useState } from "react";

type FormValues = {
  childName: string;
  childSurname: string;
  ageGroup: "" | "5-11" | "12-18";
  parentEmail: string;
  parentPhone: string;
  website: string;
};

type FieldName = keyof FormValues;
type Errors = Partial<Record<Exclude<FieldName, "website">, string>>;

const initialValues: FormValues = {
  childName: "",
  childSurname: "",
  ageGroup: "",
  parentEmail: "",
  parentPhone: "",
  website: "",
};

const labels: Record<Exclude<FieldName, "website">, string> = {
  childName: "Vaiko vardas",
  childSurname: "Vaiko pavardė",
  ageGroup: "Amžiaus grupė",
  parentEmail: "Tėvų ar globėjų el. paštas",
  parentPhone: "Tėvų ar globėjų telefonas",
};

function validate(values: FormValues): Errors {
  const errors: Errors = {};
  if (values.childName.trim().length < 2) errors.childName = "Įrašykite vaiko vardą.";
  if (values.childSurname.trim().length < 2) errors.childSurname = "Įrašykite vaiko pavardę.";
  if (!values.ageGroup) errors.ageGroup = "Pasirinkite amžiaus grupę.";
  if (!/^\S+@\S+\.\S+$/.test(values.parentEmail.trim())) {
    errors.parentEmail = "Įrašykite galiojantį el. pašto adresą, pavyzdžiui, vardas@pastas.lt.";
  }
  if (values.parentPhone.replace(/[^0-9]/g, "").length < 7) {
    errors.parentPhone = "Įrašykite telefono numerį su bent 7 skaitmenimis.";
  }
  return errors;
}

export function RegistrationForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const isSubmitting = status === "submitting";
  const statusMessage = useMemo(() => {
    if (status === "success") return "Ačiū! Užklausą gavome. Netrukus su jumis susisieksime.";
    if (status === "error") return "Nepavyko išsiųsti užklausos. Pabandykite dar kartą po kelių minučių.";
    return null;
  }, [status]);

  function updateField(field: FieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (field !== "website" && errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
    if (status !== "idle") setStatus("idle");
  }

  function validateField(field: Exclude<FieldName, "website">) {
    const fieldError = validate(values)[field];
    setErrors((current) => ({ ...current, [field]: fieldError }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Registration request failed");
      setValues(initialValues);
      setErrors({});
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="registration-form" noValidate onSubmit={handleSubmit}>
      <div className="form-row">
        <Field
          autoComplete="given-name"
          error={errors.childName}
          id="childName"
          label={labels.childName}
          onBlur={() => validateField("childName")}
          onChange={(value) => updateField("childName", value)}
          value={values.childName}
        />
        <Field
          autoComplete="family-name"
          error={errors.childSurname}
          id="childSurname"
          label={labels.childSurname}
          onBlur={() => validateField("childSurname")}
          onChange={(value) => updateField("childSurname", value)}
          value={values.childSurname}
        />
      </div>
      <div className="field">
        <label htmlFor="ageGroup">{labels.ageGroup}</label>
        <select
          aria-describedby={errors.ageGroup ? "ageGroup-error" : undefined}
          aria-invalid={Boolean(errors.ageGroup)}
          id="ageGroup"
          name="ageGroup"
          onBlur={() => validateField("ageGroup")}
          onChange={(event) => updateField("ageGroup", event.target.value)}
          required
          value={values.ageGroup}
        >
          <option value="">Pasirinkite grupę</option>
          <option value="5-11">5–11 metų</option>
          <option value="12-18">12–18 metų</option>
        </select>
        {errors.ageGroup && <p className="field-error" id="ageGroup-error">{errors.ageGroup}</p>}
      </div>
      <Field
        autoComplete="email"
        error={errors.parentEmail}
        id="parentEmail"
        inputMode="email"
        label={labels.parentEmail}
        onBlur={() => validateField("parentEmail")}
        onChange={(value) => updateField("parentEmail", value)}
        type="email"
        value={values.parentEmail}
      />
      <Field
        autoComplete="tel"
        error={errors.parentPhone}
        id="parentPhone"
        inputMode="tel"
        label={labels.parentPhone}
        onBlur={() => validateField("parentPhone")}
        onChange={(value) => updateField("parentPhone", value)}
        type="tel"
        value={values.parentPhone}
      />
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Svetainė</label>
        <input
          autoComplete="off"
          id="website"
          name="website"
          onChange={(event) => updateField("website", event.target.value)}
          tabIndex={-1}
          value={values.website}
        />
      </div>
      <p className="privacy-note">Jūsų duomenis naudosime tik tam, kad galėtume atsakyti į šią užklausą.</p>
      <button className="button button-dark" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Siunčiame užklausą…" : "Siųsti užklausą"} <span aria-hidden="true">→</span>
      </button>
      <div aria-live="polite" className={`form-status ${status}`} role="status">
        {statusMessage}
      </div>
    </form>
  );
}

function Field({
  autoComplete,
  error,
  id,
  inputMode,
  label,
  onBlur,
  onChange,
  type = "text",
  value,
}: {
  autoComplete?: string;
  error?: string;
  id: Exclude<FieldName, "website">;
  inputMode?: "email" | "tel";
  label: string;
  onBlur: () => void;
  onChange: (value: string) => void;
  type?: "email" | "tel" | "text";
  value: string;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={Boolean(error)}
        autoComplete={autoComplete}
        id={id}
        inputMode={inputMode}
        name={id}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
        required
        type={type}
        value={value}
      />
      {error && <p className="field-error" id={`${id}-error`}>{error}</p>}
    </div>
  );
}
