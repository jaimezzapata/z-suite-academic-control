import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL no esta configurada.");
}

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

const adapter = new PrismaPg({
  connectionString,
});

function createPrismaClient() {
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

function hasCurrentDelegates(client: PrismaClient) {
  return (
    "institution" in client &&
    "academicPeriod" in client &&
    "campus" in client &&
    "shift" in client &&
    "trimesterCatalog" in client &&
    "academicGroup" in client &&
    "subject" in client &&
    "classroom" in client &&
    "academicLoad" in client
  );
}

const cachedPrisma = globalForPrisma.prisma;

export function getPrismaClient() {
  const currentPrisma = globalForPrisma.prisma;

  if (currentPrisma && hasCurrentDelegates(currentPrisma)) {
    return currentPrisma;
  }

  const nextPrisma = createPrismaClient();

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = nextPrisma;
  }

  return nextPrisma;
}

export const prisma =
  cachedPrisma && hasCurrentDelegates(cachedPrisma)
    ? cachedPrisma
    : getPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
