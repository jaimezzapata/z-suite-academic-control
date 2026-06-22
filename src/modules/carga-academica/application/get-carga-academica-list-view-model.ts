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
  const cesdeStats = getInstitutionSummary(academicLoads, "cesde");
  const senaStats = getInstitutionSummary(academicLoads, "sena");

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
        label: "Total",
        value: String(activeLoadsCount),
        helper: `${formatRecognizedHours(totalRecognizedWeeklyHours)} semanales en seguimiento`,
      },
      {
        label: "CESDE",
        value: String(cesdeStats.loadsCount),
        helper: `${formatRecognizedHours(cesdeStats.recognizedWeeklyHours)} semanales en CESDE`,
      },
      {
        label: "SENA",
        value: String(senaStats.loadsCount),
        helper: `${formatRecognizedHours(senaStats.recognizedWeeklyHours)} semanales en SENA`,
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

function getInstitutionSummary(
  loads: Array<{
    status: "ACTIVE" | "PENDING" | "COMPLETED" | "CANCELLED";
    startsAt: string;
    endsAt: string;
    teachingDays: readonly string[];
    institution: {
      name: string;
    };
  }>,
  institutionKey: string,
) {
  return loads.reduce(
    (summary, load) => {
      if (load.institution.name.trim().toLowerCase().includes(institutionKey)) {
        summary.loadsCount += load.status === "ACTIVE" ? 1 : 0;
        summary.recognizedWeeklyHours += getRecognizedWeeklyHours(
          load.startsAt,
          load.endsAt,
          load.teachingDays as AcademicLoadClassDay[],
          getInstitutionAcademicHourMinutes(load.institution),
        );
      }

      return summary;
    },
    {
      loadsCount: 0,
      recognizedWeeklyHours: 0,
    },
  );
}
