import {
  getInstitutionAcademicHourMinutes,
  getRecognizedWeeklyHours,
  type AcademicLoadClassDay,
} from "@/src/modules/carga-academica/domain/calculate-academic-load-hours";
import { getAcademicLoadSnapshot } from "@/src/modules/carga-academica/infrastructure/academic-loads-repository";
import type { AcademicLoadFormValues } from "@/src/modules/carga-academica/application/get-carga-academica-form-view-model";

export type AcademicLoadListItem = {
  id: string;
  institution: string;
  period: string;
  subject: string;
  group: string;
  startTime: string;
  endTime: string;
  campus: string;
  room: string;
  shift: string;
  daysLabel: string;
  recognizedHoursLabel: string;
  isActive: boolean;
  statusValue: "ACTIVE" | "PENDING" | "COMPLETED" | "CANCELLED";
  status: "Activa" | "Pendiente" | "Completada" | "Inactiva";
  formValues: AcademicLoadFormValues;
};

export type AcademicLoadListViewModel = {
  badge: string;
  title: string;
  description: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
  secondaryActionHref: string;
  summary: Array<{
    label: string;
    value: string;
    helper: string;
  }>;
  loads: AcademicLoadListItem[];
  emptyState: {
    title: string;
    description: string;
    actionLabel: string;
  };
};

export async function getAcademicLoadListViewModel(): Promise<AcademicLoadListViewModel> {
  const academicLoads = await getAcademicLoadSnapshot();

  const loads = academicLoads.map((load) => ({
    id: load.id,
    institution: load.institution.name,
    period: `${load.period.year} · ${load.period.label}`,
    subject: load.subject.name,
    group: load.group.name,
    startTime: load.startsAt,
    endTime: load.endsAt,
    campus: load.campus.name,
    room: load.classroom.name,
    shift: load.shift.name,
    daysLabel: load.teachingDays.map(getClassDayLabel).join(" · "),
    recognizedHoursLabel: formatRecognizedHours(
      getRecognizedWeeklyHours(
        load.startsAt,
        load.endsAt,
        load.teachingDays as AcademicLoadClassDay[],
        getInstitutionAcademicHourMinutes(load.institution),
      ),
    ),
    isActive: load.status === "ACTIVE",
    statusValue: load.status,
    status: getAcademicLoadStatusLabel(load.status),
    formValues: {
      periodId: load.periodId,
      campusId: load.campusId,
      shiftId: load.shiftId,
      groupId: load.groupId,
      subjectId: load.subjectId,
      startsOn: formatDateInputValue(load.startsOn),
      endsOn: formatDateInputValue(load.endsOn),
      teachingDays: load.teachingDays,
      startsAt: load.startsAt,
      endsAt: load.endsAt,
      classroomId: load.classroomId,
    },
  }));

  const activeLoadsCount = academicLoads.filter(
    (load) => load.status === "ACTIVE",
  ).length;
  const totalRecognizedWeeklyHours = academicLoads.reduce((total, load) => {
    return (
      total +
      getRecognizedWeeklyHours(
        load.startsAt,
        load.endsAt,
        load.teachingDays as AcademicLoadClassDay[],
        getInstitutionAcademicHourMinutes(load.institution),
      )
    );
  }, 0);
  const focusInstitution = getFocusInstitution(academicLoads);

  return {
    badge: "Carga academica",
    title: "Gestiona tus asignaciones academicas",
    description:
      "Aqui registras cada bloque operativo de carga horaria con sede, jornada, grupo, materia, hora de inicio, hora de fin y salon.",
    primaryActionLabel: "Nueva carga academica",
    secondaryActionLabel: "Abrir catalogos",
    secondaryActionHref: "/carga-academica/catalogos",
    summary: [
      {
        label: "Cargas activas",
        value: String(activeLoadsCount),
        helper:
          activeLoadsCount === 0
            ? "Aun no hay bloques activos registrados."
            : "Bloques operativos actualmente en seguimiento.",
      },
      {
        label: "Horas semanales",
        value: formatRecognizedHours(totalRecognizedWeeklyHours),
        helper:
          "Calculadas segun la duracion de hora academica definida por institucion",
      },
      {
        label: "Institucion foco",
        value: focusInstitution ?? "Sin datos",
        helper: "Institucion con mayor volumen de cargas registradas",
      },
    ],
    loads,
    emptyState: {
      title: "Todavia no hay cargas registradas",
      description:
        "Crea tu primera carga para empezar a conectar materia, grupo y bloque horario real.",
      actionLabel: "Crear primera carga",
    },
  };
}

function getAcademicLoadStatusLabel(
  value: "ACTIVE" | "PENDING" | "COMPLETED" | "CANCELLED",
) {
  const labels = {
    ACTIVE: "Activa",
    PENDING: "Pendiente",
    COMPLETED: "Completada",
    CANCELLED: "Inactiva",
  } as const;

  return labels[value];
}

function formatDateInputValue(value: Date) {
  return value.toISOString().slice(0, 10);
}

function getClassDayLabel(
  value:
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY",
) {
  const labels = {
    MONDAY: "Lunes",
    TUESDAY: "Martes",
    WEDNESDAY: "Miercoles",
    THURSDAY: "Jueves",
    FRIDAY: "Viernes",
    SATURDAY: "Sabado",
    SUNDAY: "Domingo",
  } as const;

  return labels[value];
}

function formatRecognizedHours(totalHours: number) {
  if (!Number.isFinite(totalHours)) {
    return "0 h";
  }

  return Number.isInteger(totalHours) ? `${totalHours} h` : `${totalHours.toFixed(1)} h`;
}

function getFocusInstitution(
  loads: Array<{
    institution: {
      name: string;
    };
  }>,
) {
  if (loads.length === 0) {
    return null;
  }

  const counts = new Map<string, number>();

  for (const load of loads) {
    counts.set(load.institution.name, (counts.get(load.institution.name) ?? 0) + 1);
  }

  return [...counts.entries()].sort((left, right) => right[1] - left[1])[0]?.[0] ?? null;
}
