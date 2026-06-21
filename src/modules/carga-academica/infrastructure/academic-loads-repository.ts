import { getPrismaClient } from "@/src/shared/lib/prisma";

export async function getAcademicLoadSnapshot() {
  const prisma = getPrismaClient();

  return prisma.academicLoad.findMany({
    include: {
      institution: true,
      period: true,
      campus: true,
      shift: true,
      group: true,
      subject: true,
      classroom: true,
    },
    orderBy: [{ createdAt: "desc" }],
  });
}
