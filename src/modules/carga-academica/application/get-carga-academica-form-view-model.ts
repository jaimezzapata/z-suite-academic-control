import { getAcademicCatalogSnapshot } from "@/src/modules/carga-academica/infrastructure/academic-catalogs-repository";

export type AcademicLoadFormFieldOption = {
  label: string;
  value: string;
  institutionId?: string;
  institutionName?: string;
};

export type AcademicLoadFormField = {
  name: keyof AcademicLoadFormValues;
  label: string;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  fieldType?:
    | "text"
    | "textarea"
    | "select"
    | "time"
    | "date"
    | "checkbox-group";
  options?: AcademicLoadFormFieldOption[];
  actionLink?: {
    href: string;
    label: string;
  };
};

export type AcademicLoadFormSection = {
  title: string;
  description: string;
  fields: AcademicLoadFormField[];
};

export type AcademicLoadFormValues = {
  periodId: string;
  campusId: string;
  shiftId: string;
  groupId: string;
  subjectId: string;
  startsOn: string;
  endsOn: string;
  teachingDays: string[];
  startsAt: string;
  endsAt: string;
  classroomId: string;
};

export type AcademicLoadFormViewModel = {
  badge: string;
  title: string;
  description: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
  institutions: Array<{
    id: string;
    name: string;
  }>;
  sections: AcademicLoadFormSection[];
};

export async function getAcademicLoadFormViewModel(): Promise<AcademicLoadFormViewModel> {
  const catalogs = await getAcademicCatalogSnapshot();
  const periodOptions = createPeriodOptions(catalogs.periods);
  const campusOptions = createCatalogOptions(catalogs.campuses);
  const shiftOptions = createCatalogOptions(catalogs.shifts);
  const groupOptions = createCatalogOptions(catalogs.groups);
  const subjectOptions = createCatalogOptions(catalogs.subjects);
  const classroomOptions = createCatalogOptions(catalogs.classrooms);

  return {
    badge: "Nueva carga academica",
    title: "Registra una carga horaria",
    description:
      "Esta version inicial usa catalogos reutilizables para que registres sede, jornada, grupo, materia, fechas, horas y salon sin repetir informacion manualmente.",
    primaryActionLabel: "Guardar carga",
    secondaryActionLabel: "Volver al listado",
    institutions: catalogs.institutions.map((institution) => ({
      id: institution.id,
      name: institution.name,
    })),
    sections: [
      {
        title: "Datos base",
        description:
          "Registra el contexto academico principal del bloque que te asignaron.",
        fields: [
          {
            name: "periodId",
            label: "Periodo",
            placeholder: "Selecciona un periodo",
            hint:
              periodOptions.length === 0
                ? "Aun no hay periodos registrados. Crea el primero desde catalogos."
                : "Selecciona el periodo academico al que pertenece la carga.",
            fieldType: "select",
            required: true,
            options: periodOptions,
            actionLink: {
              href: "/carga-academica/catalogos?tab=periodos",
              label: "Gestionar periodos",
            },
          },
          {
            name: "campusId",
            label: "Sede",
            placeholder: "Selecciona una sede",
            hint:
              campusOptions.length === 0
                ? "Aun no hay sedes registradas. Crea la primera desde catalogos."
                : "Elige una sede ya registrada en catalogos.",
            fieldType: "select",
            required: true,
            options: campusOptions,
            actionLink: {
              href: "/carga-academica/catalogos?tab=sedes",
              label: "Gestionar sedes",
            },
          },
          {
            name: "shiftId",
            label: "Jornada",
            placeholder: "Selecciona una jornada",
            hint:
              shiftOptions.length === 0
                ? "Aun no hay jornadas registradas. Crea la primera desde catalogos."
                : "Selecciona una jornada ya creada para reutilizarla.",
            fieldType: "select",
            required: true,
            options: shiftOptions,
            actionLink: {
              href: "/carga-academica/catalogos?tab=jornadas",
              label: "Gestionar jornadas",
            },
          },
          {
            name: "groupId",
            label: "Grupo",
            placeholder: "Selecciona un grupo",
            hint:
              groupOptions.length === 0
                ? "Aun no hay grupos registrados. Crea el primero desde catalogos."
                : "Reutiliza un grupo ya definido para la institucion correspondiente.",
            fieldType: "select",
            required: true,
            options: groupOptions,
            actionLink: {
              href: "/carga-academica/catalogos?tab=grupos",
              label: "Gestionar grupos",
            },
          },
          {
            name: "subjectId",
            label: "Materia",
            placeholder: "Selecciona una materia",
            hint:
              subjectOptions.length === 0
                ? "Aun no hay materias registradas. Crea la primera desde catalogos."
                : "Selecciona la materia desde tu catalogo reutilizable.",
            fieldType: "select",
            required: true,
            options: subjectOptions,
            actionLink: {
              href: "/carga-academica/catalogos?tab=materias",
              label: "Gestionar materias",
            },
          },
        ],
      },
      {
        title: "Franja horaria",
        description:
          "Define el bloque exacto con el que vas a trabajar en tu horario.",
        fields: [
          {
            name: "startsOn",
            label: "Fecha inicio",
            fieldType: "date",
            required: true,
          },
          {
            name: "endsOn",
            label: "Fecha fin",
            fieldType: "date",
            required: true,
          },
          {
            name: "teachingDays",
            label: "Dia o dias de clase",
            fieldType: "checkbox-group",
            required: true,
            options: [
              { label: "Lunes", value: "MONDAY" },
              { label: "Martes", value: "TUESDAY" },
              { label: "Miercoles", value: "WEDNESDAY" },
              { label: "Jueves", value: "THURSDAY" },
              { label: "Viernes", value: "FRIDAY" },
              { label: "Sabado", value: "SATURDAY" },
            ],
          },
          {
            name: "startsAt",
            label: "Hora inicio",
            fieldType: "time",
            required: true,
          },
          {
            name: "endsAt",
            label: "Hora fin",
            fieldType: "time",
            required: true,
          },
          {
            name: "classroomId",
            label: "Salon",
            placeholder: "Selecciona un salon",
            hint:
              classroomOptions.length === 0
                ? "Aun no hay salones registrados. Crea el primero desde catalogos."
                : "Selecciona un salon o laboratorio ya creado.",
            fieldType: "select",
            required: true,
            options: classroomOptions,
            actionLink: {
              href: "/carga-academica/catalogos?tab=salones",
              label: "Gestionar salones",
            },
          },
        ],
      },
    ],
  };
}

function createPeriodOptions(
  items: Array<{
    id: string;
    year: number;
    label: string;
    institution: {
      id: string;
      name: string;
    };
  }>,
): AcademicLoadFormFieldOption[] {
  return items.map((item) => ({
    label: `${item.institution.name} · ${item.year} · ${item.label}`,
    value: item.id,
    institutionId: item.institution.id,
    institutionName: item.institution.name,
  }));
}

function createCatalogOptions(
  items: Array<{
    id: string;
    name: string;
    institution: {
      id: string;
      name: string;
    };
  }>,
): AcademicLoadFormFieldOption[] {
  return items.map((item) => ({
    label: `${item.institution.name} · ${item.name}`,
    value: item.id,
    institutionId: item.institution.id,
    institutionName: item.institution.name,
  }));
}
