import type { AcademicLoadListViewModel } from "@/src/modules/carga-academica/application/get-carga-academica-list-view-model";

type AcademicLoadListScreenProps = {
  viewModel: AcademicLoadListViewModel;
  onOpenCreateModal: () => void;
};

export function AcademicLoadListScreen({
  viewModel,
  onOpenCreateModal,
}: AcademicLoadListScreenProps) {
  return (
    <section className="space-y-4 text-slate-950">
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500">
              {viewModel.badge}
            </p>
            <h1 className="mt-2 text-2xl font-semibold leading-tight text-slate-950 sm:text-3xl">
              {viewModel.title}
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              {viewModel.description}
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenCreateModal}
            className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-slate-800"
          >
            {viewModel.primaryActionLabel}
          </button>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        {viewModel.summary.map((item) => (
          <article
            key={item.label}
            className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
              {item.label}
            </p>
            <p className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
              {item.value}
            </p>
            <p className="mt-1.5 text-sm leading-6 text-slate-600">
              {item.helper}
            </p>
          </article>
        ))}
      </div>

      {viewModel.loads.length === 0 ? (
        <div className="rounded-4xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
          <h2 className="text-xl font-semibold text-slate-950">
            {viewModel.emptyState.title}
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-600">
            {viewModel.emptyState.description}
          </p>
          <button
            type="button"
            onClick={onOpenCreateModal}
            className="mt-6 inline-flex cursor-pointer items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-slate-800"
          >
            {viewModel.emptyState.actionLabel}
          </button>
        </div>
      ) : (
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-3 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-1.5">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  <th className="px-3 py-1.5 font-medium">Materia</th>
                  <th className="px-3 py-1.5 font-medium">Institucion</th>
                  <th className="px-3 py-1.5 font-medium">Periodo</th>
                  <th className="px-3 py-1.5 font-medium">Grupo</th>
                  <th className="px-3 py-1.5 font-medium">Horario</th>
                  <th className="px-3 py-1.5 font-medium">Ubicacion</th>
                  <th className="px-3 py-1.5 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {viewModel.loads.map((load) => (
                  <tr key={load.id} className="rounded-2xl bg-slate-50 text-sm">
                    <td className="rounded-l-2xl px-3 py-3">
                      <div>
                        <p className="font-semibold text-slate-950">
                          {load.subject}
                        </p>
                        <p className="mt-1 text-slate-500">{load.shift}</p>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-slate-700">
                      {load.institution}
                    </td>
                    <td className="px-3 py-3 text-slate-700">{load.period}</td>
                    <td className="px-3 py-3 text-slate-700">{load.group}</td>
                    <td className="px-3 py-3 text-slate-700">
                      {load.startTime} - {load.endTime}
                    </td>
                    <td className="px-3 py-3 text-slate-700">
                      <p>{load.campus}</p>
                      <p className="mt-1 text-slate-500">Salon {load.room}</p>
                    </td>
                    <td className="rounded-r-2xl px-3 py-3">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          load.status === "Activa"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {load.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
