import { AcademicLoadFormScreen } from "@/src/modules/carga-academica/ui/academic-load-form-screen";
import { getAcademicLoadFormViewModel } from "@/src/modules/carga-academica/application/get-carga-academica-form-view-model";

export default function NewAcademicLoadPage() {
  const viewModel = getAcademicLoadFormViewModel();

  return <AcademicLoadFormScreen viewModel={viewModel} />;
}
