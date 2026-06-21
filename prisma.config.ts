// Prisma CLI does not reliably read `.env.local` the same way Next.js does.
// Load it explicitly so migrations and introspection use the same credentials.
import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

loadEnv({ path: ".env.local" });
loadEnv();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Migrations and introspection should use the direct session connection.
    url: process.env["DIRECT_URL"] ?? process.env["DATABASE_URL"],
  },
});
