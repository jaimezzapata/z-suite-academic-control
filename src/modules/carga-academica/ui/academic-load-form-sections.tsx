import Link from "next/link";
import type {
  AcademicLoadFormValues,
  AcademicLoadFormViewModel,
} from "@/src/modules/carga-academica/application/get-carga-academica-form-view-model";

type AcademicLoadFormSectionsProps = {
  sections: AcademicLoadFormViewModel["sections"];
  compact?: boolean;
  disabled?: boolean;
  values?: Partial<AcademicLoadFormValues>;
};

export function AcademicLoadFormSections({
  sections,
  compact = false,
  disabled = false,
  values,
}: AcademicLoadFormSectionsProps) {
  return (
    <div className={compact ? "grid gap-4 xl:grid-cols-2" : "space-y-6"}>
      {sections.map((section) => (
        <article
          key={section.title}
          className={`rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] ${
            compact ? "p-4" : "p-6 sm:p-8"
          }`}
        >
          <div className="max-w-2xl">
            <h2
              className={`font-semibold tracking-tight text-slate-950 ${
                compact ? "text-base" : "text-xl"
              }`}
            >
              {section.title}
            </h2>
            <p
              className={`text-slate-600 ${
                compact ? "mt-1 text-xs leading-5" : "mt-2 text-sm leading-6"
              }`}
            >
              {section.description}
            </p>
          </div>

          <div
            className={`grid md:grid-cols-2 ${
              compact ? "mt-4 gap-3" : "mt-6 gap-5"
            }`}
          >
            {section.fields.map((field) => (
              <label
                key={field.label}
                className={`block ${field.fieldType === "textarea" || field.fieldType === "checkbox-group" ? "md:col-span-2" : ""}`}
              >
                <span className="mb-2 flex items-center justify-between gap-3">
                  <span className="block text-sm font-medium text-slate-700">
                    {field.label}
                  </span>
                  {field.actionLink ? (
                    <Link
                      href={field.actionLink.href}
                      className="text-xs font-semibold text-slate-600 underline decoration-slate-300 underline-offset-4 transition-colors duration-200 hover:text-slate-950"
                    >
                      {field.actionLink.label}
                    </Link>
                  ) : null}
                </span>

                {field.fieldType === "textarea" ? (
                  <textarea
                    name={field.name}
                    rows={compact ? 4 : 5}
                    placeholder={field.placeholder}
                    defaultValue={getFieldValue(values, field.name)}
                    required={field.required}
                    disabled={disabled}
                    className={`w-full rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-950 outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-slate-400 ${
                      compact ? "px-3.5 py-2.5" : "px-4 py-3"
                    }`}
                  />
                ) : field.fieldType === "select" ? (
                  <select
                    name={field.name}
                    defaultValue={getFieldValue(values, field.name)}
                    required={field.required}
                    disabled={disabled}
                    className={`w-full rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-950 outline-none transition-colors duration-200 focus:border-slate-400 ${
                      compact ? "px-3.5 py-2.5" : "px-4 py-3"
                    }`}
                  >
                    <option value="" disabled>
                      {field.placeholder ?? "Selecciona una opcion"}
                    </option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.fieldType === "time" ? (
                  <input
                    type="time"
                    name={field.name}
                    defaultValue={getFieldValue(values, field.name)}
                    required={field.required}
                    disabled={disabled}
                    className={`w-full rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-950 outline-none transition-colors duration-200 focus:border-slate-400 ${
                      compact ? "px-3.5 py-2.5" : "px-4 py-3"
                    }`}
                  />
                ) : field.fieldType === "date" ? (
                  <input
                    type="date"
                    name={field.name}
                    defaultValue={getFieldValue(values, field.name)}
                    required={field.required}
                    disabled={disabled}
                    className={`w-full rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-950 outline-none transition-colors duration-200 focus:border-slate-400 ${
                      compact ? "px-3.5 py-2.5" : "px-4 py-3"
                    }`}
                  />
                ) : field.fieldType === "checkbox-group" ? (
                  <div
                    className={`grid gap-2 ${
                      compact ? "grid-cols-3 xl:grid-cols-3" : "sm:grid-cols-3"
                    }`}
                  >
                    {field.options?.map((option) => (
                      <label
                        key={option.value}
                        className={`flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 transition-colors duration-200 hover:border-slate-300 hover:bg-white ${
                          compact ? "px-3 py-2 text-xs" : "px-4 py-3 text-sm"
                        }`}
                      >
                        <input
                          type="checkbox"
                          name={field.name}
                          value={option.value}
                          defaultChecked={hasCheckboxValue(
                            values,
                            field.name,
                            option.value,
                          )}
                          disabled={disabled}
                          className="h-4 w-4 rounded border-slate-300 text-slate-950"
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <input
                    type="text"
                    name={field.name}
                    placeholder={field.placeholder}
                    defaultValue={getFieldValue(values, field.name)}
                    required={field.required}
                    disabled={disabled}
                    className={`w-full rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-950 outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-slate-400 ${
                      compact ? "px-3.5 py-2.5" : "px-4 py-3"
                    }`}
                  />
                )}

                {field.hint ? (
                  <span className="mt-2 block text-xs leading-5 text-slate-500">
                    {field.hint}
                  </span>
                ) : null}
              </label>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function getFieldValue(
  values: Partial<AcademicLoadFormValues> | undefined,
  fieldName: keyof AcademicLoadFormValues,
) {
  const value = values?.[fieldName];

  return typeof value === "string" ? value : "";
}

function hasCheckboxValue(
  values: Partial<AcademicLoadFormValues> | undefined,
  fieldName: keyof AcademicLoadFormValues,
  optionValue: string,
) {
  const value = values?.[fieldName];

  return Array.isArray(value) ? value.includes(optionValue) : false;
}
