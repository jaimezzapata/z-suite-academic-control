import type { Session } from "next-auth";

export type PanelHomeViewModel = {
  greeting: string;
  title: string;
  description: string;
  focusCards: Array<{
    title: string;
    value: string;
    helper: string;
  }>;
  agendaItems: Array<{
    title: string;
    detail: string;
    timeLabel: string;
  }>;
  summaryBlocks: Array<{
    title: string;
    description: string;
  }>;
};

export function getPanelHomeViewModel(
  user: NonNullable<Session["user"]>,
): PanelHomeViewModel {
  const fallbackName = user.name?.trim() || "Docente";
  const firstName = fallbackName.split(" ")[0] || fallbackName;

  return {
    greeting: `Hola, ${firstName}`,
    title: "Tu centro de control esta listo",
    description:
      "Desde aqui puedes priorizar agenda, nomina y pendientes sin perder el contexto general de tu trabajo.",
    focusCards: [
      {
        title: "Agenda de hoy",
        value: "3 bloques",
        helper: "CESDE y SENA distribuidos durante la jornada",
      },
      {
        title: "Nomina esperada",
        value: "$ 1.280.000",
        helper: "Proyeccion quincenal basada en tu carga activa",
      },
      {
        title: "Pendientes",
        value: "5 activos",
        helper: "Dos requieren atencion antes del cierre de semana",
      },
    ],
    agendaItems: [
      {
        title: "Programacion Web",
        detail: "CESDE · Grupo A · Jornada noche",
        timeLabel: "6:00 PM - 9:00 PM",
      },
      {
        title: "Revision de evidencias",
        detail: "SENA · Trimestre actual · Seguimiento de aprendices",
        timeLabel: "10:00 AM - 11:30 AM",
      },
      {
        title: "Preparar estructura de Drive",
        detail: "CESDE · Semestre 2 · Documentos de inicio",
        timeLabel: "Bloque flexible",
      },
    ],
    summaryBlocks: [
      {
        title: "Enfoque del dia",
        description:
          "Prioriza el seguimiento de carga academica, la validacion de horas y los pendientes cercanos.",
      },
      {
        title: "Estado del sistema",
        description:
          "La sesion esta activa y el layout base del panel ya esta listo para escalar a los demas modulos.",
      },
    ],
  };
}
