-- CreateTable
CREATE TABLE "TrimesterCatalog" (
    "id" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrimesterCatalog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TrimesterCatalog_institutionId_idx" ON "TrimesterCatalog"("institutionId");

-- CreateIndex
CREATE UNIQUE INDEX "TrimesterCatalog_institutionId_slug_key" ON "TrimesterCatalog"("institutionId", "slug");

-- AddForeignKey
ALTER TABLE "TrimesterCatalog" ADD CONSTRAINT "TrimesterCatalog_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE CASCADE ON UPDATE CASCADE;
