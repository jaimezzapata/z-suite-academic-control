type AcademicLoadFormFiltersModalProps = {
  isOpen: boolean;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onClose: () => void;
  onClear: () => void;
  onApply: () => void;
};

export function AcademicLoadFormFiltersModal({
  isOpen,
  searchValue,
  onSearchChange,
  onClose,
  onClear,
  onApply,
}: AcademicLoadFormFiltersModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] bg-slate-950/30 p-3 backdrop-blur-sm sm:flex sm:items-center sm:justify-center">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-xl rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-4 py-4 sm:px-5">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500">
              Filtros
            </p>
            <h3 className="mt-1.5 text-lg font-semibold text-slate-950">
              Buscar dentro de la institucion
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Filtra periodos, sedes, jornadas, grupos, materias y salones por texto.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition-colors duration-200 hover:bg-slate-50"
            aria-label="Cerrar filtros"
          >
            <span className="text-lg leading-none">x</span>
          </button>
        </div>

        <div className="space-y-4 px-4 py-4 sm:px-5 sm:py-5">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Buscar
            </span>
            <input
              type="text"
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Ejemplo: G1, WEB, Bello, 2026"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-slate-400"
            />
          </label>
        </div>

        <div className="flex flex-col gap-2 border-t border-slate-200 bg-white px-4 py-4 sm:flex-row sm:justify-end sm:px-5">
          <button
            type="button"
            onClick={onClear}
            className="inline-flex cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50"
          >
            Limpiar
          </button>
          <button
            type="button"
            onClick={onApply}
            className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-slate-800"
          >
            Aplicar filtros
          </button>
        </div>
      </div>
    </div>
  );
}
