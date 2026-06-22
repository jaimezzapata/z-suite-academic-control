import { getAcademicLoadSnapshot } from "@/src/modules/carga-academica/infrastructure/academic-loads-repository";

type HorariosCalendarEventColor = {
  background: string;
  border: string;
  text: string;
};

export type HorariosInstitutionLegendItem = {
  institution: string;
  color: HorariosCalendarEventColor;
};

export type HorariosWeekCalendarEvent = {
  id: string;
  dayIndex: number;
  startsAt: string;
  endsAt: string;
  title: string;
  subtitle: string;
  location: string;
  top: number;
  height: number;
  color: HorariosCalendarEventColor;
};

export type HorariosWeekCalendarDay = {
  dateKey: string;
  shortLabel: string;
  dayLabel: string;
  dateLabel: string;
};

export type HorariosWeekCalendarViewModel = {
  badge: string;
  title: string;
  description: string;
  weekLabel: string;
  navigation: {
    previousWeekHref: string;
    nextWeekHref: string;
    todayHref: string;
  };
  institutionLegend: HorariosInstitutionLegendItem[];
  days: HorariosWeekCalendarDay[];
  hours: Array<{
    label: string;
    minutes: number;
  }>;
  grid: {
    startMinute: number;
    endMinute: number;
    minuteHeight: number;
    height: number;
  };
  events: HorariosWeekCalendarEvent[];
  emptyState: {
    title: string;
    description: string;
  };
};

type AcademicLoadSnapshotItem = Awaited<
  ReturnType<typeof getAcademicLoadSnapshot>
>[number];

type WeekQuery = {
  week?: string | string[];
};

export async function getHorariosWeekCalendarViewModel(
  query: WeekQuery,
): Promise<HorariosWeekCalendarViewModel> {
  const startMinute = 6 * 60;
  const endMinute = 22 * 60;
  const minuteHeight = 0.55;

  const baseDateKey = getQueryWeekKey(query.week) ?? getUtcDateKey(new Date());
  const weekStart = getWeekStartDate(parseDateKey(baseDateKey));
  const days = buildWeekDays(weekStart);

  const academicLoads = await getAcademicLoadSnapshot();
  const visibleLoads = academicLoads.filter((load) => load.status !== "CANCELLED");
  const institutionLegend = buildInstitutionLegend(visibleLoads);

  const events = buildWeekEvents(visibleLoads, days, {
    startMinute,
    endMinute,
    minuteHeight,
  });

  const weekLabel = getWeekLabel(days);

  return {
    badge: "Horarios",
    title: "Tu calendario semanal",
    description:
      "Aqui ves la distribucion de tu carga academica en un calendario semanal tipo Google Calendar.",
    weekLabel,
    navigation: {
      previousWeekHref: buildWeekHref(addDays(weekStart, -7)),
      nextWeekHref: buildWeekHref(addDays(weekStart, 7)),
      todayHref: buildWeekHref(getWeekStartDate(parseDateKey(getUtcDateKey(new Date())))),
    },
    institutionLegend,
    days,
    hours: buildHours(startMinute, endMinute),
    grid: {
      startMinute,
      endMinute,
      minuteHeight,
      height: (endMinute - startMinute) * minuteHeight,
    },
    events,
    emptyState: {
      title: "No hay bloques para esta semana",
      description:
        "Cuando registres cargas activas con dias y horas, se pintaran automaticamente en este calendario.",
    },
  };
}

function buildWeekEvents(
  loads: AcademicLoadSnapshotItem[],
  days: HorariosWeekCalendarDay[],
  grid: { startMinute: number; endMinute: number; minuteHeight: number },
) {
  const events: HorariosWeekCalendarEvent[] = [];

  for (const load of loads) {
    const loadStartKey = toDateKey(load.startsOn);
    const loadEndKey = toDateKey(load.endsOn);
    const startMinutes = parseTimeToMinutes(load.startsAt);
    const endMinutes = parseTimeToMinutes(load.endsAt);

    if (!Number.isFinite(startMinutes) || !Number.isFinite(endMinutes)) {
      continue;
    }

    const clippedStartMinutes = Math.max(startMinutes, grid.startMinute);
    const clippedEndMinutes = Math.min(endMinutes, grid.endMinute);

    if (clippedEndMinutes <= clippedStartMinutes) {
      continue;
    }

    const top = (clippedStartMinutes - grid.startMinute) * grid.minuteHeight;
    const height = (clippedEndMinutes - clippedStartMinutes) * grid.minuteHeight;

    const classDayIndexes = new Set(load.teachingDays.map(getClassDayIndex));
    const color = getInstitutionEventColor(load.institution.name);

    for (const [dayIndex, day] of days.entries()) {
      const matchesDay = classDayIndexes.has(dayIndex);
      const isInRange = day.dateKey >= loadStartKey && day.dateKey <= loadEndKey;

      if (!matchesDay || !isInRange) {
        continue;
      }

      events.push({
        id: `${load.id}-${day.dateKey}`,
        dayIndex,
        startsAt: load.startsAt,
        endsAt: load.endsAt,
        title: `${load.subject.name} · ${load.group.name}`,
        subtitle: `${load.shift.name} · ${load.institution.name}`,
        location: `${load.campus.name} · Salon ${load.classroom.name}`,
        top,
        height,
        color,
      });
    }
  }

  return events;
}

function buildWeekDays(weekStart: Date): HorariosWeekCalendarDay[] {
  const dayLabels = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"] as const;
  const monthLabels = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ] as const;

  return Array.from({ length: 7 }).map((_, index) => {
    const date = addDays(weekStart, index);
    const dateKey = toDateKey(date);
    const day = date.getUTCDate();
    const month = monthLabels[date.getUTCMonth()] ?? "";

    return {
      dateKey,
      shortLabel: `${dayLabels[index]} ${day}`,
      dayLabel: dayLabels[index] ?? "",
      dateLabel: `${day} ${month}`,
    };
  });
}

function buildHours(startMinute: number, endMinute: number) {
  const hours: Array<{ label: string; minutes: number }> = [];
  const startHour = Math.floor(startMinute / 60);
  const endHour = Math.ceil(endMinute / 60);

  for (let hour = startHour; hour <= endHour; hour += 1) {
    const minutes = hour * 60;
    if (minutes < startMinute || minutes > endMinute) {
      continue;
    }

    hours.push({
      label: `${pad2(hour)}:00`,
      minutes,
    });
  }

  return hours;
}

function getWeekLabel(days: HorariosWeekCalendarDay[]) {
  const start = days[0];
  const end = days[6];

  if (!start || !end) {
    return "Semana";
  }

  return `${start.dateLabel} · ${end.dateLabel}`;
}

function getQueryWeekKey(value: WeekQuery["week"]) {
  if (!value) {
    return null;
  }

  const key = Array.isArray(value) ? value[0] : value;

  if (typeof key !== "string") {
    return null;
  }

  return /^\d{4}-\d{2}-\d{2}$/.test(key) ? key : null;
}

function buildWeekHref(weekStart: Date) {
  return `/horarios?week=${encodeURIComponent(toDateKey(weekStart))}`;
}

function getWeekStartDate(value: Date) {
  const day = value.getUTCDay();
  const mondayIndex = day === 0 ? 6 : day - 1;

  return addDays(value, -mondayIndex);
}

function addDays(value: Date, days: number) {
  return new Date(value.getTime() + days * 24 * 60 * 60 * 1000);
}

function toDateKey(value: Date) {
  return `${value.getUTCFullYear()}-${pad2(value.getUTCMonth() + 1)}-${pad2(value.getUTCDate())}`;
}

function parseDateKey(value: string) {
  const [year, month, day] = value.split("-").map((part) => Number(part));
  return new Date(Date.UTC(year ?? 0, (month ?? 1) - 1, day ?? 1));
}

function getUtcDateKey(value: Date) {
  return `${value.getUTCFullYear()}-${pad2(value.getUTCMonth() + 1)}-${pad2(value.getUTCDate())}`;
}

function pad2(value: number) {
  return value.toString().padStart(2, "0");
}

function parseTimeToMinutes(value: string) {
  const [hours, minutes] = value.split(":").map((part) => Number(part));

  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    return Number.NaN;
  }

  return hours * 60 + minutes;
}

function getClassDayIndex(
  value:
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY",
): number {
  const mapping = {
    MONDAY: 0,
    TUESDAY: 1,
    WEDNESDAY: 2,
    THURSDAY: 3,
    FRIDAY: 4,
    SATURDAY: 5,
    SUNDAY: 6,
  } as const;

  return mapping[value] ?? 0;
}

function getInstitutionEventColor(institutionName: string): HorariosCalendarEventColor {
  const key = institutionName.trim().toLowerCase();
  const paletteByInstitution: Record<string, HorariosCalendarEventColor> = {
    cesde: {
      background: "rgba(59, 130, 246, 0.16)",
      border: "rgba(59, 130, 246, 0.55)",
      text: "rgb(30, 64, 175)",
    },
    sena: {
      background: "rgba(34, 197, 94, 0.16)",
      border: "rgba(34, 197, 94, 0.55)",
      text: "rgb(21, 128, 61)",
    },
  };

  for (const [institutionKey, color] of Object.entries(paletteByInstitution)) {
    if (key.includes(institutionKey)) {
      return color;
    }
  }

  const fallbackPalette: HorariosCalendarEventColor[] = [
    {
      background: "rgba(168, 85, 247, 0.16)",
      border: "rgba(168, 85, 247, 0.55)",
      text: "rgb(107, 33, 168)",
    },
    {
      background: "rgba(245, 158, 11, 0.18)",
      border: "rgba(245, 158, 11, 0.55)",
      text: "rgb(146, 64, 14)",
    },
    {
      background: "rgba(236, 72, 153, 0.16)",
      border: "rgba(236, 72, 153, 0.55)",
      text: "rgb(157, 23, 77)",
    },
    {
      background: "rgba(20, 184, 166, 0.16)",
      border: "rgba(20, 184, 166, 0.55)",
      text: "rgb(17, 94, 89)",
    },
  ];

  let hash = 0;
  for (const character of key) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  }

  return fallbackPalette[hash % fallbackPalette.length];
}

function buildInstitutionLegend(
  loads: AcademicLoadSnapshotItem[],
): HorariosInstitutionLegendItem[] {
  const seen = new Set<string>();
  const items: HorariosInstitutionLegendItem[] = [];

  for (const load of loads) {
    const institution = load.institution.name.trim();
    const normalizedInstitution = institution.toLowerCase();

    if (seen.has(normalizedInstitution)) {
      continue;
    }

    seen.add(normalizedInstitution);
    items.push({
      institution,
      color: getInstitutionEventColor(institution),
    });
  }

  return items.sort((left, right) =>
    left.institution.localeCompare(right.institution, "es"),
  );
}
