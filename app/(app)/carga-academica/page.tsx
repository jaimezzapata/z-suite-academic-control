import {
  createAcademicLoadAction,
  deleteAcademicLoadAction,
  toggleAcademicLoadStatusAction,
  updateAcademicLoadAction,
} from "@/src/modules/carga-academica/application/create-academic-load-action";
import { getAcademicLoadFormViewModel } from "@/src/modules/carga-academica/application/get-carga-academica-form-view-model";
import { getAcademicLoadListViewModel } from "@/src/modules/carga-academica/application/get-carga-academica-list-view-model";
import { AcademicLoadModule } from "@/src/modules/carga-academica/ui/academic-load-module";

export default async function AcademicLoadPage() {
  const listViewModel = await getAcademicLoadListViewModel();
  const formViewModel = await getAcademicLoadFormViewModel();

  return (
    <AcademicLoadModule
      listViewModel={listViewModel}
      formViewModel={formViewModel}
      createAction={createAcademicLoadAction}
      updateAction={updateAcademicLoadAction}
      deleteAction={deleteAcademicLoadAction}
      toggleStatusAction={toggleAcademicLoadStatusAction}
    />
  );
}
