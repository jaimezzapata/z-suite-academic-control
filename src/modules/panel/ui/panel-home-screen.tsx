import type { PanelHomeViewModel } from "@/src/modules/panel/application/get-panel-home-view-model";
import { AuthFeedbackToast } from "@/src/shared/ui/auth/auth-feedback-toast";

type PanelHomeScreenProps = {
  viewModel: PanelHomeViewModel;
};

export function PanelHomeScreen({ viewModel }: PanelHomeScreenProps) {
  return (
    <section className="space-y-6 text-slate-950">
      <AuthFeedbackToast expectedEvent="signed-in" />
      <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
              {viewModel.greeting}
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
              {viewModel.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {viewModel.description}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:min-w-105">
            {viewModel.focusCards.map((card) => (
              <article
                key={card.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4"
              >
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
                  {card.title}
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                  {card.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {card.helper}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
        <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
                Agenda inmediata
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                Lo proximo en tu flujo
              </h2>
            </div>

            <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
              Vista del dia
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {viewModel.agendaItems.map((item) => (
              <article
                key={`${item.title}-${item.timeLabel}`}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-xl">
                    <h3 className="text-lg font-semibold text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.detail}
                    </p>
                  </div>

                  <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
                    {item.timeLabel}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          {viewModel.summaryBlocks.map((block) => (
            <article
              key={block.title}
              className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8"
            >
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
                {block.title}
              </p>
              <p className="mt-4 text-base leading-7 text-slate-600">
                {block.description}
              </p>
            </article>
          ))}
        </section>
      </div>
    </section>
  );
}
