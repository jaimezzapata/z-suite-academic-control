"use client";

import { useAcademicLoadCreateModal } from "@/src/shared/hooks/carga-academica/use-academic-load-create-modal";
import type { AcademicLoadFormViewModel } from "@/src/modules/carga-academica/application/get-carga-academica-form-view-model";
import type { AcademicLoadListViewModel } from "@/src/modules/carga-academica/application/get-carga-academica-list-view-model";
import { AcademicLoadCreateModal } from "@/src/modules/carga-academica/ui/academic-load-create-modal";
import { AcademicLoadListScreen } from "@/src/modules/carga-academica/ui/academic-load-list-screen";

type AcademicLoadModuleProps = {
  listViewModel: AcademicLoadListViewModel;
  formViewModel: AcademicLoadFormViewModel;
};

export function AcademicLoadModule({
  listViewModel,
  formViewModel,
}: AcademicLoadModuleProps) {
  const { closeModal, isOpen, openModal } = useAcademicLoadCreateModal();

  return (
    <>
      <AcademicLoadListScreen
        viewModel={listViewModel}
        onOpenCreateModal={openModal}
      />

      <AcademicLoadCreateModal
        viewModel={formViewModel}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </>
  );
}
