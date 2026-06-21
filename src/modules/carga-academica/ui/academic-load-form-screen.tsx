import Link from "next/link";
import type { AcademicLoadFormViewModel } from "@/src/modules/carga-academica/application/get-carga-academica-form-view-model";
import { AcademicLoadFormSections } from "@/src/modules/carga-academica/ui/academic-load-form-sections";

type AcademicLoadFormScreenProps = {
  viewModel: AcademicLoadFormViewModel;
};

export function AcademicLoadFormScreen({
  viewModel,
}: AcademicLoadFormScreenProps) {
  return (
    <section className="space-y-6 text-slate-950">
      <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
          {viewModel.badge}
        </p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
          {viewModel.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          {viewModel.description}
        </p>
      </div>

      <form className="space-y-6">
        <AcademicLoadFormSections sections={viewModel.sections} />

        <div className="flex flex-col gap-3 rounded-4xl border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:flex-row sm:justify-end">
          <Link
            href="/carga-academica"
            className="inline-flex cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50"
          >
            {viewModel.secondaryActionLabel}
          </Link>
          <button
            type="button"
            className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-slate-800"
          >
            {viewModel.primaryActionLabel}
          </button>
        </div>
      </form>
    </section>
  );
}
