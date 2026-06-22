import type { AcademicLoadFormViewModel } from "@/src/modules/carga-academica/application/get-carga-academica-form-view-model";

type AcademicLoadFormToolbarProps = {
  institutions: AcademicLoadFormViewModel["institutions"];
  activeInstitutionId: string;
  onSelectInstitution: (institutionId: string) => void;
  onOpenFilters: () => void;
  hasActiveFilters: boolean;
  disabled?: boolean;
};

export function AcademicLoadFormToolbar({
  institutions,
  activeInstitutionId,
  onSelectInstitution,
  onOpenFilters,
  hasActiveFilters,
  disabled = false,
}: AcademicLoadFormToolbarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-[1.5rem] border border-slate-200 bg-white p-3 shadow-[0_18px_50px_rgba(15,23,42,0.05)] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {institutions.map((institution) => {
          const isActive = institution.id === activeInstitutionId;

          return (
            <button
              key={institution.id}
              type="button"
              onClick={() => onSelectInstitution(institution.id)}
              disabled={disabled}
              className={`inline-flex cursor-pointer items-center justify-center rounded-2xl px-3.5 py-2 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 ${
                isActive
                  ? "bg-slate-950 text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {institution.name}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onOpenFilters}
        disabled={disabled}
        className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border px-3.5 py-2 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 ${
          hasActiveFilters
            ? "border-slate-950 bg-slate-950 text-white hover:bg-slate-800"
            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
        }`}
      >
        <span>{hasActiveFilters ? "Filtros activos" : "Configurar filtros"}</span>
      </button>
    </div>
  );
}
