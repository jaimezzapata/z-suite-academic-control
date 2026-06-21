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
  status: "Activa" | "Pendiente";
};

export type AcademicLoadListViewModel = {
  badge: string;
  title: string;
  description: string;
  primaryActionLabel: string;
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

export function getAcademicLoadListViewModel(): AcademicLoadListViewModel {
  const loads: AcademicLoadListItem[] = [
    {
      id: "ca-001",
      institution: "CESDE",
      period: "2026 · Semestre 2",
      subject: "Programacion Web",
      group: "Grupo A",
      startTime: "18:00",
      endTime: "21:00",
      campus: "Poblado",
      room: "304",
      shift: "Noche",
      status: "Activa",
    },
    {
      id: "ca-002",
      institution: "CESDE",
      period: "2026 · Semestre 2",
      subject: "Bases de Datos",
      group: "Grupo B",
      startTime: "17:00",
      endTime: "19:00",
      campus: "Bello",
      room: "201",
      shift: "Mixta",
      status: "Pendiente",
    },
  ];

  return {
    badge: "Carga academica",
    title: "Gestiona tus asignaciones academicas",
    description:
      "Aqui registras cada bloque operativo de carga horaria con sede, jornada, grupo, materia, hora de inicio, hora de fin y salon.",
    primaryActionLabel: "Nueva carga academica",
    summary: [
      {
        label: "Cargas activas",
        value: "2",
        helper: "Una en seguimiento y una en definicion operativa",
      },
      {
        label: "Horas semanales",
        value: "10 h",
        helper: "Base operativa para cruzar bloques, horarios y nomina",
      },
      {
        label: "Institucion foco",
        value: "CESDE",
        helper: "Primer flujo funcional priorizado en la app",
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
