"use client";

import Link from "next/link";
import type { AcademicLoadFormViewModel } from "@/src/modules/carga-academica/application/get-carga-academica-form-view-model";
import { AcademicLoadFormFiltersModal } from "@/src/modules/carga-academica/ui/academic-load-form-filters-modal";
import { AcademicLoadFormSections } from "@/src/modules/carga-academica/ui/academic-load-form-sections";
import { AcademicLoadFormToolbar } from "@/src/modules/carga-academica/ui/academic-load-form-toolbar";
import { useAcademicLoadFormFilters } from "@/src/shared/hooks/carga-academica/use-academic-load-form-filters";

type AcademicLoadFormScreenProps = {
  viewModel: AcademicLoadFormViewModel;
};

export function AcademicLoadFormScreen({
  viewModel,
}: AcademicLoadFormScreenProps) {
  const {
    activeInstitutionId,
    setActiveInstitutionId,
    institutionTabs,
    filteredSections,
    isFilterModalOpen,
    openFilterModal,
    closeFilterModal,
    draftSearch,
    setDraftSearch,
    appliedSearch,
    applyFilters,
    clearFilters,
  } = useAcademicLoadFormFilters({
    viewModel,
  });

  return (
    <section className="space-y-4 text-slate-950">
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500">
          {viewModel.badge}
        </p>
        <h1 className="mt-2 text-xl font-semibold leading-tight text-slate-950 sm:text-2xl">
          {viewModel.title}
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          {viewModel.description}
        </p>
      </div>

      <form className="space-y-4">
        <AcademicLoadFormToolbar
          institutions={institutionTabs}
          activeInstitutionId={activeInstitutionId}
          onSelectInstitution={setActiveInstitutionId}
          onOpenFilters={openFilterModal}
          hasActiveFilters={appliedSearch.length > 0}
        />

        <AcademicLoadFormSections sections={filteredSections} />

        <div className="flex flex-col gap-2 rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:flex-row sm:justify-end">
          <Link
            href="/carga-academica"
            className="inline-flex cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50"
          >
            {viewModel.secondaryActionLabel}
          </Link>
          <button
            type="button"
            className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-slate-950 px-3.5 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-slate-800"
          >
            {viewModel.primaryActionLabel}
          </button>
        </div>
      </form>

      <AcademicLoadFormFiltersModal
        isOpen={isFilterModalOpen}
        searchValue={draftSearch}
        onSearchChange={setDraftSearch}
        onClose={closeFilterModal}
        onClear={clearFilters}
        onApply={applyFilters}
      />
    </section>
  );
}
