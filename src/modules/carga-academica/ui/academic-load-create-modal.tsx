"use client";

import type { AcademicLoadFormViewModel } from "@/src/modules/carga-academica/application/get-carga-academica-form-view-model";
import { AcademicLoadFormSections } from "@/src/modules/carga-academica/ui/academic-load-form-sections";

type AcademicLoadCreateModalProps = {
  viewModel: AcademicLoadFormViewModel;
  isOpen: boolean;
  onClose: () => void;
};

export function AcademicLoadCreateModal({
  viewModel,
  isOpen,
  onClose,
}: AcademicLoadCreateModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 px-4 py-4 backdrop-blur-sm">
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 flex w-full max-w-6xl flex-col rounded-4xl border border-slate-200 bg-[#f6f7fb] shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
        <div className="flex items-start justify-between border-b border-slate-200 bg-white px-5 py-3 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500">
              {viewModel.badge}
            </p>
            <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
              {viewModel.title}
            </h2>
            <p className="mt-1.5 text-sm leading-6 text-slate-600">
              {viewModel.description}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition-colors duration-200 hover:bg-slate-50"
            aria-label="Cerrar modal"
          >
            <span className="text-lg leading-none">×</span>
          </button>
        </div>

        <form className="flex flex-col">
          <div className="px-4 py-4 sm:px-6 sm:py-5">
            <AcademicLoadFormSections sections={viewModel.sections} compact />
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-200 bg-white px-4 py-3 sm:flex-row sm:justify-end sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50"
            >
              {viewModel.secondaryActionLabel}
            </button>
            <button
              type="button"
              className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-slate-800"
            >
              {viewModel.primaryActionLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
