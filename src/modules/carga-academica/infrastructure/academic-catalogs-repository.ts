import { getPrismaClient } from "@/src/shared/lib/prisma";

export async function getAcademicCatalogSnapshot() {
  const prisma = getPrismaClient();

  const trimesterRowsPromise = prisma.$queryRaw<
    Array<{
      id: string;
      institutionId: string;
      name: string;
      slug: string;
      isActive: boolean;
      createdAt: Date;
      updatedAt: Date;
      institutionRefId: string;
      institutionName: string;
    }>
  >`
    SELECT
      trimester."id",
      trimester."institutionId",
      trimester."name",
      trimester."slug",
      trimester."isActive",
      trimester."createdAt",
      trimester."updatedAt",
      institution."id" AS "institutionRefId",
      institution."name" AS "institutionName"
    FROM "TrimesterCatalog" AS trimester
    INNER JOIN "Institution" AS institution
      ON institution."id" = trimester."institutionId"
    ORDER BY institution."name" ASC, trimester."name" ASC
  `;

  const [
    institutions,
    periods,
    campuses,
    shifts,
    trimesterRows,
    groups,
    subjects,
    classrooms,
  ] = await Promise.all([
    prisma.institution.findMany({
      orderBy: {
        name: "asc",
      },
    }),
    prisma.academicPeriod.findMany({
      include: {
        institution: true,
      },
      orderBy: [{ year: "desc" }, { label: "asc" }],
    }),
    prisma.campus.findMany({
      include: {
        institution: true,
      },
      orderBy: [{ institution: { name: "asc" } }, { name: "asc" }],
    }),
    prisma.shift.findMany({
      include: {
        institution: true,
      },
      orderBy: [{ institution: { name: "asc" } }, { name: "asc" }],
    }),
    trimesterRowsPromise,
    prisma.academicGroup.findMany({
      include: {
        institution: true,
      },
      orderBy: [{ institution: { name: "asc" } }, { name: "asc" }],
    }),
    prisma.subject.findMany({
      include: {
        institution: true,
      },
      orderBy: [{ institution: { name: "asc" } }, { name: "asc" }],
    }),
    prisma.classroom.findMany({
      include: {
        institution: true,
      },
      orderBy: [{ institution: { name: "asc" } }, { name: "asc" }],
    }),
  ]);

  const trimesters = trimesterRows.map((trimester) => ({
    id: trimester.id,
    institutionId: trimester.institutionId,
    name: trimester.name,
    slug: trimester.slug,
    isActive: trimester.isActive,
    createdAt: trimester.createdAt,
    updatedAt: trimester.updatedAt,
    institution: {
      id: trimester.institutionRefId,
      name: trimester.institutionName,
    },
  }));

  return {
    institutions,
    periods,
    campuses,
    shifts,
    trimesters,
    groups,
    subjects,
    classrooms,
  };
}
