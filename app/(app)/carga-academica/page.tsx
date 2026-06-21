import { getAcademicLoadFormViewModel } from "@/src/modules/carga-academica/application/get-carga-academica-form-view-model";
import { getAcademicLoadListViewModel } from "@/src/modules/carga-academica/application/get-carga-academica-list-view-model";
import { AcademicLoadModule } from "@/src/modules/carga-academica/ui/academic-load-module";

export default function AcademicLoadPage() {
  const listViewModel = getAcademicLoadListViewModel();
  const formViewModel = getAcademicLoadFormViewModel();

  return (
    <AcademicLoadModule
      listViewModel={listViewModel}
      formViewModel={formViewModel}
    />
  );
}
