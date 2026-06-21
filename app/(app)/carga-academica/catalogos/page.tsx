import {
  createAcademicGroupCatalogAction,
  createAcademicPeriodCatalogAction,
  createCampusCatalogAction,
  createClassroomCatalogAction,
  createInstitutionCatalogAction,
  createShiftCatalogAction,
  createTrimesterCatalogAction,
  createSubjectCatalogAction,
  deleteAcademicGroupCatalogAction,
  deleteAcademicPeriodCatalogAction,
  deleteCampusCatalogAction,
  deleteClassroomCatalogAction,
  deleteInstitutionCatalogAction,
  deleteShiftCatalogAction,
  deleteSubjectCatalogAction,
  deleteTrimesterCatalogAction,
  updateAcademicGroupCatalogAction,
  updateAcademicPeriodCatalogAction,
  updateCampusCatalogAction,
  updateClassroomCatalogAction,
  updateInstitutionCatalogAction,
  updateShiftCatalogAction,
  updateSubjectCatalogAction,
  updateTrimesterCatalogAction,
} from "@/src/modules/carga-academica/application/catalog-actions";
import { getAcademicCatalogsViewModel } from "@/src/modules/carga-academica/application/get-carga-academica-catalogs-view-model";
import { AcademicCatalogsScreen } from "@/src/modules/carga-academica/ui/academic-catalogs-screen";

export default async function AcademicCatalogsPage() {
  const viewModel = await getAcademicCatalogsViewModel();

  return (
    <AcademicCatalogsScreen
      viewModel={viewModel}
      actions={{
        createInstitution: createInstitutionCatalogAction,
        updateInstitution: updateInstitutionCatalogAction,
        deleteInstitution: deleteInstitutionCatalogAction,
        createPeriod: createAcademicPeriodCatalogAction,
        updatePeriod: updateAcademicPeriodCatalogAction,
        deletePeriod: deleteAcademicPeriodCatalogAction,
        createCampus: createCampusCatalogAction,
        updateCampus: updateCampusCatalogAction,
        deleteCampus: deleteCampusCatalogAction,
        createShift: createShiftCatalogAction,
        updateShift: updateShiftCatalogAction,
        deleteShift: deleteShiftCatalogAction,
        createTrimester: createTrimesterCatalogAction,
        updateTrimester: updateTrimesterCatalogAction,
        deleteTrimester: deleteTrimesterCatalogAction,
        createGroup: createAcademicGroupCatalogAction,
        updateGroup: updateAcademicGroupCatalogAction,
        deleteGroup: deleteAcademicGroupCatalogAction,
        createSubject: createSubjectCatalogAction,
        updateSubject: updateSubjectCatalogAction,
        deleteSubject: deleteSubjectCatalogAction,
        createClassroom: createClassroomCatalogAction,
        updateClassroom: updateClassroomCatalogAction,
        deleteClassroom: deleteClassroomCatalogAction,
      }}
    />
  );
}
