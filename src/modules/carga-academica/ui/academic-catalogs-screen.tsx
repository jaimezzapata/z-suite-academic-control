"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { AcademicCatalogsViewModel } from "@/src/modules/carga-academica/application/get-carga-academica-catalogs-view-model";

type CatalogAction = (formData: FormData) => Promise<void>;
type CatalogItem = AcademicCatalogsViewModel["sections"]["institutions"]["items"][number];

type AcademicCatalogsScreenProps = {
  viewModel: AcademicCatalogsViewModel;
  actions: {
    createInstitution: CatalogAction;
    updateInstitution: CatalogAction;
    deleteInstitution: CatalogAction;
    createPeriod: CatalogAction;
    updatePeriod: CatalogAction;
    deletePeriod: CatalogAction;
    createCampus: CatalogAction;
    updateCampus: CatalogAction;
    deleteCampus: CatalogAction;
    createShift: CatalogAction;
    updateShift: CatalogAction;
    deleteShift: CatalogAction;
    createTrimester: CatalogAction;
    updateTrimester: CatalogAction;
    deleteTrimester: CatalogAction;
    createGroup: CatalogAction;
    updateGroup: CatalogAction;
    deleteGroup: CatalogAction;
    createSubject: CatalogAction;
    updateSubject: CatalogAction;
    deleteSubject: CatalogAction;
    createClassroom: CatalogAction;
    updateClassroom: CatalogAction;
    deleteClassroom: CatalogAction;
  };
};

export function AcademicCatalogsScreen({
  viewModel,
  actions,
}: AcademicCatalogsScreenProps) {
  const hasInstitutions = viewModel.institutionOptions.length > 0;
  const searchParams = useSearchParams();

  const renderInstitutionFields = (
    defaults?: Record<string, string>,
    disabled = false,
  ) => (
    <>
      <TextField
        name="name"
        label="Nombre"
        placeholder="Ej: CESDE"
        required
        disabled={disabled}
        defaultValue={defaults?.name}
      />
      <SelectField
        name="periodType"
        label="Tipo de periodo"
        options={[
          { label: "Semestral", value: "SEMESTER" },
          { label: "Trimestral", value: "TRIMESTER" },
          { label: "Especial", value: "SPECIAL" },
        ]}
        required
        disabled={disabled}
        defaultValue={defaults?.periodType}
      />
      <TextField
        name="academicHourMinutes"
        label="Minutos por hora academica"
        placeholder="Ej: 45"
        inputMode="numeric"
        required
        disabled={disabled}
        defaultValue={defaults?.academicHourMinutes ?? "60"}
      />
      <SelectField
        name="paymentFrequency"
        label="Frecuencia de pago"
        options={[
          { label: "Quincenal", value: "BIWEEKLY" },
          { label: "Mensual", value: "MONTHLY" },
        ]}
        required
        disabled={disabled}
        defaultValue={defaults?.paymentFrequency}
      />
      <SelectField
        name="paymentModel"
        label="Modelo de pago"
        options={[
          { label: "Valor hora", value: "HOURLY" },
          { label: "Valor fijo", value: "FIXED" },
        ]}
        required
        disabled={disabled}
        defaultValue={defaults?.paymentModel}
      />
      <SelectField
        name="contractType"
        label="Tipo de contrato"
        options={[
          { label: "Contrato fijo", value: "FIXED_TERM" },
          { label: "Prestacion de servicios", value: "SERVICE_CONTRACT" },
        ]}
        required
        disabled={disabled}
        defaultValue={defaults?.contractType}
      />
    </>
  );

  const renderPeriodFields = (
    defaults?: Record<string, string>,
    disabled = false,
  ) => (
    <>
      <InstitutionSelectField
        options={viewModel.institutionOptions}
        disabled={disabled}
        defaultValue={defaults?.institutionId}
      />
      <TextField
        name="label"
        label="Nombre del periodo"
        placeholder="Ej: Semestre 2"
        required
        disabled={disabled}
        defaultValue={defaults?.label}
      />
      <TextField
        name="year"
        label="Anio"
        placeholder="Ej: 2026"
        inputMode="numeric"
        required
        disabled={disabled}
        defaultValue={defaults?.year}
      />
      <DateField
        name="startsOn"
        label="Fecha inicio"
        required
        disabled={disabled}
        defaultValue={defaults?.startsOn}
      />
      <DateField
        name="endsOn"
        label="Fecha fin"
        required
        disabled={disabled}
        defaultValue={defaults?.endsOn}
      />
    </>
  );

  const renderSimpleInstitutionFields = (
    label: string,
    placeholder: string,
    defaults?: Record<string, string>,
    disabled = false,
  ) => (
    <>
      <InstitutionSelectField
        options={viewModel.institutionOptions}
        disabled={disabled}
        defaultValue={defaults?.institutionId}
      />
      <TextField
        name="name"
        label={label}
        placeholder={placeholder}
        required
        disabled={disabled}
        defaultValue={defaults?.name}
      />
    </>
  );

  const tabs = [
    {
      key: "instituciones",
      label: "Instituciones",
      title: "Instituciones",
      description:
        "Registra las instituciones principales para habilitar el resto de catalogos dependientes.",
      submitLabel: "Guardar institucion",
      items: viewModel.sections.institutions.items,
      createAction: actions.createInstitution,
      updateAction: actions.updateInstitution,
      deleteAction: actions.deleteInstitution,
      renderFields: renderInstitutionFields,
    },
    {
      key: "periodos",
      label: "Periodos",
      title: "Periodos",
      description: "Crea los periodos por institucion con sus fechas de inicio y fin.",
      submitLabel: "Guardar periodo",
      items: viewModel.sections.periods.items,
      createAction: actions.createPeriod,
      updateAction: actions.updatePeriod,
      deleteAction: actions.deletePeriod,
      isDisabled: !hasInstitutions,
      disabledMessage:
        "Primero crea al menos una institucion para poder registrar periodos.",
      renderFields: renderPeriodFields,
    },
    {
      key: "sedes",
      label: "Sedes",
      title: "Sedes",
      description: "Registra las sedes reutilizables para tus cargas academicas.",
      submitLabel: "Guardar sede",
      items: viewModel.sections.campuses.items,
      createAction: actions.createCampus,
      updateAction: actions.updateCampus,
      deleteAction: actions.deleteCampus,
      isDisabled: !hasInstitutions,
      disabledMessage:
        "Primero registra una institucion para poder crear sedes.",
      renderFields: (defaults, disabled) =>
        renderSimpleInstitutionFields(
          "Nombre de la sede",
          "Ej: POBLADO",
          defaults,
          disabled,
        ),
    },
    {
      key: "jornadas",
      label: "Jornadas",
      title: "Jornadas",
      description:
        "Administra jornadas reutilizables como manana, tarde, noche o mixta.",
      submitLabel: "Guardar jornada",
      items: viewModel.sections.shifts.items,
      createAction: actions.createShift,
      updateAction: actions.updateShift,
      deleteAction: actions.deleteShift,
      isDisabled: !hasInstitutions,
      disabledMessage:
        "Primero registra una institucion para poder crear jornadas.",
      renderFields: (defaults, disabled) =>
        renderSimpleInstitutionFields(
          "Nombre de la jornada",
          "Ej: NOCHE",
          defaults,
          disabled,
        ),
    },
    {
      key: "trimestres",
      label: "Trimestres",
      title: "Trimestres",
      description:
        "Gestiona el catalogo de trimestres para instituciones que trabajan bajo ese esquema.",
      submitLabel: "Guardar trimestre",
      items: viewModel.sections.trimesters.items,
      createAction: actions.createTrimester,
      updateAction: actions.updateTrimester,
      deleteAction: actions.deleteTrimester,
      isDisabled: !hasInstitutions,
      disabledMessage:
        "Primero registra una institucion para poder crear trimestres.",
      renderFields: (defaults, disabled) =>
        renderSimpleInstitutionFields(
          "Nombre del trimestre",
          "Ej: TRIMESTRE 1",
          defaults,
          disabled,
        ),
    },
    {
      key: "grupos",
      label: "Grupos",
      title: "Grupos",
      description: "Crea los grupos que luego reutilizaras al registrar tu carga.",
      submitLabel: "Guardar grupo",
      items: viewModel.sections.groups.items,
      createAction: actions.createGroup,
      updateAction: actions.updateGroup,
      deleteAction: actions.deleteGroup,
      isDisabled: !hasInstitutions,
      disabledMessage:
        "Primero registra una institucion para poder crear grupos.",
      renderFields: (defaults, disabled) =>
        renderSimpleInstitutionFields(
          "Nombre del grupo",
          "Ej: GRUPO A",
          defaults,
          disabled,
        ),
    },
    {
      key: "materias",
      label: "Materias",
      title: "Materias",
      description:
        "Centraliza las materias para no tener que escribirlas una y otra vez.",
      submitLabel: "Guardar materia",
      items: viewModel.sections.subjects.items,
      createAction: actions.createSubject,
      updateAction: actions.updateSubject,
      deleteAction: actions.deleteSubject,
      isDisabled: !hasInstitutions,
      disabledMessage:
        "Primero registra una institucion para poder crear materias.",
      renderFields: (defaults, disabled) =>
        renderSimpleInstitutionFields(
          "Nombre de la materia",
          "Ej: PROGRAMACION WEB",
          defaults,
          disabled,
        ),
    },
    {
      key: "salones",
      label: "Salones",
      title: "Salones",
      description:
        "Gestiona los salones o laboratorios reutilizables de cada institucion.",
      submitLabel: "Guardar salon",
      items: viewModel.sections.classrooms.items,
      createAction: actions.createClassroom,
      updateAction: actions.updateClassroom,
      deleteAction: actions.deleteClassroom,
      isDisabled: !hasInstitutions,
      disabledMessage:
        "Primero registra una institucion para poder crear salones.",
      renderFields: (defaults, disabled) =>
        renderSimpleInstitutionFields(
          "Nombre del salon",
          "Ej: SALON 304",
          defaults,
          disabled,
        ),
    },
  ] satisfies CatalogTabConfig[];

  const requestedTab = searchParams.get("tab");
  const activeTab = tabs.find((tab) => tab.key === requestedTab) ?? tabs[0];

  return (
    <section className="space-y-4 text-slate-950">
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-5">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500">
              {viewModel.badge}
            </p>
            <h1 className="mt-1.5 text-xl font-semibold leading-tight text-slate-950 sm:text-2xl">
              {viewModel.title}
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {viewModel.description}
            </p>
          </div>

          <Link
            href="/carga-academica"
            className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50"
          >
            Volver a carga academica
          </Link>
        </div>
      </div>

      <div className="grid gap-2.5 md:grid-cols-3">
        {viewModel.summary.map((item) => (
          <article
            key={item.label}
            className="rounded-[1.25rem] border border-slate-200 bg-white p-3.5 shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
              {item.label}
            </p>
            <p className="mt-1.5 text-lg font-semibold tracking-tight text-slate-950">
              {item.value}
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              {item.helper}
            </p>
          </article>
        ))}
      </div>

      <div>
        <div className="flex flex-wrap items-end gap-1.5">
          {tabs.map((tab) => {
            const isActive = tab.key === activeTab.key;

            return (
              <Link
                key={tab.key}
                href={`/carga-academica/catalogos?tab=${tab.key}`}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-t-[1.1rem] border border-b-0 px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? "border-slate-200 bg-white text-slate-950"
                    : "border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`inline-flex min-w-6 items-center justify-center rounded-full px-1.5 py-0.5 text-[11px] ${
                    isActive
                      ? "bg-slate-950 text-white"
                      : "bg-white text-slate-600"
                  }`}
                >
                  {tab.items.length}
                </span>
              </Link>
            );
          })}
        </div>

        <CatalogCard
          id={activeTab.key}
          title={activeTab.title}
          description={activeTab.description}
          submitLabel={activeTab.submitLabel}
          items={activeTab.items}
          createAction={activeTab.createAction}
          updateAction={activeTab.updateAction}
          deleteAction={activeTab.deleteAction}
          isDisabled={activeTab.isDisabled}
          disabledMessage={activeTab.disabledMessage}
          renderFields={activeTab.renderFields}
        />
      </div>
    </section>
  );
}

type CatalogTabKey =
  | "instituciones"
  | "periodos"
  | "sedes"
  | "jornadas"
  | "trimestres"
  | "grupos"
  | "materias"
  | "salones";

type CatalogTabConfig = {
  key: CatalogTabKey;
  label: string;
  title: string;
  description: string;
  submitLabel: string;
  items: CatalogItem[];
  createAction: CatalogAction;
  updateAction: CatalogAction;
  deleteAction: CatalogAction;
  isDisabled?: boolean;
  disabledMessage?: string;
  renderFields: (
    defaults?: Record<string, string>,
    disabled?: boolean,
  ) => React.ReactNode;
};

type CatalogCardProps = {
  id: string;
  title: string;
  description: string;
  submitLabel: string;
  items: CatalogItem[];
  createAction: CatalogAction;
  updateAction: CatalogAction;
  deleteAction: CatalogAction;
  isDisabled?: boolean;
  disabledMessage?: string;
  renderFields: (
    defaults?: Record<string, string>,
    disabled?: boolean,
  ) => React.ReactNode;
};

function CatalogCard({
  id,
  title,
  description,
  submitLabel,
  items,
  createAction,
  updateAction,
  deleteAction,
  isDisabled = false,
  disabledMessage,
  renderFields,
}: CatalogCardProps) {
  return (
    <article
      id={id}
      className="rounded-b-3xl rounded-r-3xl border border-slate-200 bg-white p-3.5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-4"
    >
      <div className="flex flex-col gap-3">
        <div>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold tracking-tight text-slate-950">
              {title}
            </h2>
            <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
              {items.length}
            </span>
          </div>
          <p className="mt-1 text-sm leading-5 text-slate-600">{description}</p>
        </div>

        <div className="grid gap-3 xl:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
          <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">
                Registros actuales
              </p>
              <span className="text-xs font-medium text-slate-500">
                Editar o eliminar
              </span>
            </div>

            {items.length === 0 ? (
              <p className="mt-3 text-sm leading-5 text-slate-500">
                Todavia no hay registros para este catalogo.
              </p>
            ) : (
              <ul className="mt-3 space-y-1.5">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-xl border border-slate-200 bg-white p-3"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold leading-5 text-slate-950">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-[11px] leading-4 text-slate-500">
                            {item.meta}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <details className="group">
                            <summary className="inline-flex cursor-pointer list-none items-center justify-center rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50">
                              Editar
                            </summary>
                            <form
                              action={updateAction}
                              className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3"
                            >
                              <input type="hidden" name="id" value={item.id} />
                              <div className="grid gap-2.5 sm:grid-cols-2">
                                {renderFields(item.formValues)}
                              </div>
                              <button
                                type="submit"
                                className="mt-3 inline-flex cursor-pointer items-center justify-center rounded-xl bg-slate-950 px-4 py-2 text-xs font-semibold text-white transition-colors duration-200 hover:bg-slate-800"
                              >
                                Guardar cambios
                              </button>
                            </form>
                          </details>

                          <form action={deleteAction}>
                            <input type="hidden" name="id" value={item.id} />
                            <button
                              type="submit"
                              className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition-colors duration-200 hover:bg-rose-100"
                            >
                              Eliminar
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <form
            action={createAction}
            className="rounded-[1.25rem] border border-slate-200 bg-white p-3"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">
              Crear registro
            </p>

            {isDisabled && disabledMessage ? (
              <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-800">
                {disabledMessage}
              </p>
            ) : null}

            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {renderFields(undefined, isDisabled)}
            </div>

            <button
              type="submit"
              disabled={isDisabled}
              className="mt-3 inline-flex w-full cursor-pointer items-center justify-center rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {submitLabel}
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}

type TextFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
};

function TextField({
  name,
  label,
  placeholder,
  inputMode,
  required = false,
  disabled = false,
  defaultValue,
}: TextFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-slate-600">
        {label}
      </span>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        inputMode={inputMode}
        required={required}
        disabled={disabled}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-950 outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-slate-400 disabled:cursor-not-allowed disabled:bg-slate-100"
      />
    </label>
  );
}

type DateFieldProps = {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
};

function DateField({
  name,
  label,
  required = false,
  disabled = false,
  defaultValue,
}: DateFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-slate-600">
        {label}
      </span>
      <input
        type="date"
        name={name}
        required={required}
        disabled={disabled}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-950 outline-none transition-colors duration-200 focus:border-slate-400 disabled:cursor-not-allowed disabled:bg-slate-100"
      />
    </label>
  );
}

type SelectFieldProps = {
  name: string;
  label: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
};

function SelectField({
  name,
  label,
  options,
  required = false,
  disabled = false,
  defaultValue,
}: SelectFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-slate-600">
        {label}
      </span>
      <select
        name={name}
        defaultValue={defaultValue ?? ""}
        required={required}
        disabled={disabled}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-950 outline-none transition-colors duration-200 focus:border-slate-400 disabled:cursor-not-allowed disabled:bg-slate-100"
      >
        <option value="" disabled>
          Selecciona una opcion
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function InstitutionSelectField({
  options,
  disabled = false,
  defaultValue,
}: {
  options: AcademicCatalogsViewModel["institutionOptions"];
  disabled?: boolean;
  defaultValue?: string;
}) {
  return (
    <SelectField
      name="institutionId"
      label="Institucion"
      options={options}
      required
      disabled={disabled}
      defaultValue={defaultValue}
    />
  );
}
