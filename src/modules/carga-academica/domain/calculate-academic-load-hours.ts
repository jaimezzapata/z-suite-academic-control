export type AcademicLoadClassDay =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

type InstitutionAcademicHourContext = {
  name: string;
  slug?: string | null;
  academicHourMinutes?: number | null;
};

const SATURDAY_LUNCH_BREAK_START = 12 * 60;
const SATURDAY_LUNCH_BREAK_END = 13 * 60 + 30;

export function getInstitutionAcademicHourMinutes(
  institution: InstitutionAcademicHourContext,
) {
  if (isCesdeInstitution(institution)) {
    return 45;
  }

  if (
    Number.isFinite(institution.academicHourMinutes) &&
    (institution.academicHourMinutes ?? 0) > 0
  ) {
    return institution.academicHourMinutes as number;
  }

  return 60;
}

export function getRecognizedWeeklyHours(
  startsAt: string,
  endsAt: string,
  teachingDays: AcademicLoadClassDay[],
  academicHourMinutes: number,
) {
  if (!Number.isFinite(academicHourMinutes) || academicHourMinutes <= 0) {
    return 0;
  }

  const effectiveWeeklyMinutes = getEffectiveWeeklyMinutes(
    startsAt,
    endsAt,
    teachingDays,
  );

  if (!Number.isFinite(effectiveWeeklyMinutes) || effectiveWeeklyMinutes <= 0) {
    return 0;
  }

  return effectiveWeeklyMinutes / academicHourMinutes;
}

function getEffectiveWeeklyMinutes(
  startsAt: string,
  endsAt: string,
  teachingDays: AcademicLoadClassDay[],
) {
  return teachingDays.reduce((total, day) => {
    return total + getEffectiveMinutesForDay(startsAt, endsAt, day);
  }, 0);
}

function getEffectiveMinutesForDay(
  startsAt: string,
  endsAt: string,
  day: AcademicLoadClassDay,
) {
  const startMinutes = toMinutes(startsAt);
  const endMinutes = toMinutes(endsAt);

  if (
    !Number.isFinite(startMinutes) ||
    !Number.isFinite(endMinutes) ||
    endMinutes <= startMinutes
  ) {
    return 0;
  }

  const visualMinutes = endMinutes - startMinutes;

  if (day !== "SATURDAY") {
    return visualMinutes;
  }

  const lunchOverlapMinutes = getOverlapMinutes(
    startMinutes,
    endMinutes,
    SATURDAY_LUNCH_BREAK_START,
    SATURDAY_LUNCH_BREAK_END,
  );

  return Math.max(0, visualMinutes - lunchOverlapMinutes);
}

function getOverlapMinutes(
  rangeStart: number,
  rangeEnd: number,
  blockedStart: number,
  blockedEnd: number,
) {
  const overlapStart = Math.max(rangeStart, blockedStart);
  const overlapEnd = Math.min(rangeEnd, blockedEnd);

  return Math.max(0, overlapEnd - overlapStart);
}

function toMinutes(value: string) {
  if (!value || !value.includes(":")) {
    return Number.NaN;
  }

  const [hours, minutes] = value.split(":").map(Number);

  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    return Number.NaN;
  }

  return hours * 60 + minutes;
}

function isCesdeInstitution(institution: InstitutionAcademicHourContext) {
  const normalizedSlug = normalizeInstitutionValue(institution.slug);
  const normalizedName = normalizeInstitutionValue(institution.name);

  return normalizedSlug === "cesde" || normalizedName === "cesde";
}

function normalizeInstitutionValue(value?: string | null) {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}
