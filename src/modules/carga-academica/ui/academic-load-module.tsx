"use client";

import type { AcademicLoadActionResult } from "@/src/modules/carga-academica/application/create-academic-load-action";
import { useAcademicLoadCreateModal } from "@/src/shared/hooks/carga-academica/use-academic-load-create-modal";
import type { AcademicLoadFormViewModel } from "@/src/modules/carga-academica/application/get-carga-academica-form-view-model";
import type { AcademicLoadListViewModel } from "@/src/modules/carga-academica/application/get-carga-academica-list-view-model";
import { AcademicLoadCreateModal } from "@/src/modules/carga-academica/ui/academic-load-create-modal";
import { AcademicLoadListScreen } from "@/src/modules/carga-academica/ui/academic-load-list-screen";

type AcademicLoadModuleProps = {
  listViewModel: AcademicLoadListViewModel;
  formViewModel: AcademicLoadFormViewModel;
  createAction: (formData: FormData) => Promise<AcademicLoadActionResult>;
  updateAction: (formData: FormData) => Promise<AcademicLoadActionResult>;
  deleteAction: (loadId: string) => Promise<AcademicLoadActionResult>;
  toggleStatusAction: (
    loadId: string,
    nextStatus: "ACTIVE" | "CANCELLED",
  ) => Promise<AcademicLoadActionResult>;
};

export function AcademicLoadModule({
  listViewModel,
  formViewModel,
  createAction,
  updateAction,
  deleteAction,
  toggleStatusAction,
}: AcademicLoadModuleProps) {
  const { closeModal, isOpen, openEditModal, openModal, selectedLoad } =
    useAcademicLoadCreateModal();

  return (
    <>
      <AcademicLoadListScreen
        viewModel={listViewModel}
        onOpenCreateModal={openModal}
        onOpenEditModal={openEditModal}
        onDelete={deleteAction}
        onToggleStatus={toggleStatusAction}
      />

      <AcademicLoadCreateModal
        viewModel={formViewModel}
        isOpen={isOpen}
        onClose={closeModal}
        mode={selectedLoad ? "edit" : "create"}
        values={selectedLoad?.formValues}
        loadId={selectedLoad?.id}
        submitAction={selectedLoad ? updateAction : createAction}
      />
    </>
  );
}
