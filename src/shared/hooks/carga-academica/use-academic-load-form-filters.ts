"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  AcademicLoadFormValues,
  AcademicLoadFormViewModel,
} from "@/src/modules/carga-academica/application/get-carga-academica-form-view-model";

type UseAcademicLoadFormFiltersParams = {
  viewModel: AcademicLoadFormViewModel;
  values?: Partial<AcademicLoadFormValues>;
  isOpen?: boolean;
};

export function useAcademicLoadFormFilters({
  viewModel,
  values,
  isOpen = true,
}: UseAcademicLoadFormFiltersParams) {
  const [activeInstitutionId, setActiveInstitutionId] = useState<string>(
    viewModel.institutions[0]?.id ?? "",
  );
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [appliedSearch, setAppliedSearch] = useState("");
  const [draftSearch, setDraftSearch] = useState("");

  const selectedInstitutionId = useMemo(() => {
    if (!values) {
      return "";
    }

    for (const section of viewModel.sections) {
      for (const field of section.fields) {
        if (field.fieldType !== "select") {
          continue;
        }

        const currentValue = values[field.name];
        if (typeof currentValue !== "string" || currentValue.length === 0) {
          continue;
        }

        const selectedOption = field.options?.find(
          (option) => option.value === currentValue,
        );

        if (selectedOption?.institutionId) {
          return selectedOption.institutionId;
        }
      }
    }

    return "";
  }, [values, viewModel.sections]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setActiveInstitutionId(
      selectedInstitutionId || viewModel.institutions[0]?.id || "",
    );
    setIsFilterModalOpen(false);
    setAppliedSearch("");
    setDraftSearch("");
  }, [isOpen, selectedInstitutionId, viewModel.institutions]);

  const filteredSections = useMemo(() => {
    const normalizedSearch = appliedSearch.trim().toLowerCase();

    return viewModel.sections.map((section) => ({
      ...section,
      fields: section.fields.map((field) => {
        if (field.fieldType !== "select") {
          return field;
        }

        const filteredOptions =
          field.options?.filter((option) => {
            const matchesInstitution =
              !activeInstitutionId || option.institutionId === activeInstitutionId;
            const haystack = `${option.label} ${option.institutionName ?? ""}`.toLowerCase();
            const matchesSearch =
              normalizedSearch.length === 0 || haystack.includes(normalizedSearch);

            return matchesInstitution && matchesSearch;
          }) ?? [];

        return {
          ...field,
          options: filteredOptions,
        };
      }),
    }));
  }, [activeInstitutionId, appliedSearch, viewModel.sections]);

  return {
    activeInstitutionId,
    setActiveInstitutionId,
    institutionTabs: viewModel.institutions,
    filteredSections,
    isFilterModalOpen,
    openFilterModal: () => {
      setDraftSearch(appliedSearch);
      setIsFilterModalOpen(true);
    },
    closeFilterModal: () => {
      setDraftSearch(appliedSearch);
      setIsFilterModalOpen(false);
    },
    draftSearch,
    setDraftSearch,
    appliedSearch,
    applyFilters: () => {
      setAppliedSearch(draftSearch.trim());
      setIsFilterModalOpen(false);
    },
    clearFilters: () => {
      setDraftSearch("");
      setAppliedSearch("");
    },
  };
}
