import { AcademicLoadFormScreen } from "@/src/modules/carga-academica/ui/academic-load-form-screen";
import { getAcademicLoadFormViewModel } from "@/src/modules/carga-academica/application/get-carga-academica-form-view-model";

export default async function NewAcademicLoadPage() {
  const viewModel = await getAcademicLoadFormViewModel();

  return <AcademicLoadFormScreen viewModel={viewModel} />;
}
