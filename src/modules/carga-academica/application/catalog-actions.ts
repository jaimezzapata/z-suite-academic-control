"use server";

import { randomUUID } from "node:crypto";
import {
  ContractType,
  PaymentFrequency,
  PaymentModel,
  PeriodType,
} from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getPrismaClient } from "@/src/shared/lib/prisma";

export async function createInstitutionCatalogAction(formData: FormData) {
  const prisma = getPrismaClient();
  const name = getRequiredField(formData, "name", true);
  const academicHourMinutes = getPositiveIntegerField(
    formData,
    "academicHourMinutes",
  );

  await prisma.institution.create({
    data: {
      name,
      slug: toSlug(name),
      periodType: getRequiredField(formData, "periodType") as PeriodType,
      academicHourMinutes,
      paymentFrequency: getRequiredField(
        formData,
        "paymentFrequency",
      ) as PaymentFrequency,
      paymentModel: getRequiredField(formData, "paymentModel") as PaymentModel,
      contractType: getRequiredField(formData, "contractType") as ContractType,
    },
  });

  revalidateCatalogPaths();
}

export async function createAcademicPeriodCatalogAction(formData: FormData) {
  const prisma = getPrismaClient();
  const institutionId = getRequiredField(formData, "institutionId");
  const label = getRequiredField(formData, "label", true);
  const year = Number(getRequiredField(formData, "year"));
  const startsOn = getDateField(formData, "startsOn");
  const endsOn = getDateField(formData, "endsOn");

  await prisma.academicPeriod.create({
    data: {
      institutionId,
      year,
      label,
      slug: toSlug(label),
      startsOn,
      endsOn,
    },
  });

  revalidateCatalogPaths();
}

export async function createCampusCatalogAction(formData: FormData) {
  await createSimpleInstitutionCatalogEntity(formData, "campus");
}

export async function createShiftCatalogAction(formData: FormData) {
  await createSimpleInstitutionCatalogEntity(formData, "shift");
}

export async function createTrimesterCatalogAction(formData: FormData) {
  await createSimpleInstitutionCatalogEntity(formData, "trimester");
}

export async function createAcademicGroupCatalogAction(formData: FormData) {
  await createSimpleInstitutionCatalogEntity(formData, "group");
}

export async function createSubjectCatalogAction(formData: FormData) {
  await createSimpleInstitutionCatalogEntity(formData, "subject");
}

export async function createClassroomCatalogAction(formData: FormData) {
  await createSimpleInstitutionCatalogEntity(formData, "classroom");
}

export async function updateInstitutionCatalogAction(formData: FormData) {
  const prisma = getPrismaClient();
  const id = getRequiredField(formData, "id");
  const name = getRequiredField(formData, "name", true);
  const academicHourMinutes = getPositiveIntegerField(
    formData,
    "academicHourMinutes",
  );

  await prisma.institution.update({
    where: { id },
    data: {
      name,
      slug: toSlug(name),
      periodType: getRequiredField(formData, "periodType") as PeriodType,
      academicHourMinutes,
      paymentFrequency: getRequiredField(
        formData,
        "paymentFrequency",
      ) as PaymentFrequency,
      paymentModel: getRequiredField(formData, "paymentModel") as PaymentModel,
      contractType: getRequiredField(formData, "contractType") as ContractType,
    },
  });

  revalidateCatalogPaths();
}

export async function updateAcademicPeriodCatalogAction(formData: FormData) {
  const prisma = getPrismaClient();
  const id = getRequiredField(formData, "id");
  const institutionId = getRequiredField(formData, "institutionId");
  const label = getRequiredField(formData, "label", true);
  const year = Number(getRequiredField(formData, "year"));
  const startsOn = getDateField(formData, "startsOn");
  const endsOn = getDateField(formData, "endsOn");

  await prisma.academicPeriod.update({
    where: { id },
    data: {
      institutionId,
      label,
      slug: toSlug(label),
      year,
      startsOn,
      endsOn,
    },
  });

  revalidateCatalogPaths();
}

export async function updateCampusCatalogAction(formData: FormData) {
  await updateSimpleInstitutionCatalogEntity(formData, "campus");
}

export async function updateShiftCatalogAction(formData: FormData) {
  await updateSimpleInstitutionCatalogEntity(formData, "shift");
}

export async function updateTrimesterCatalogAction(formData: FormData) {
  await updateSimpleInstitutionCatalogEntity(formData, "trimester");
}

export async function updateAcademicGroupCatalogAction(formData: FormData) {
  await updateSimpleInstitutionCatalogEntity(formData, "group");
}

export async function updateSubjectCatalogAction(formData: FormData) {
  await updateSimpleInstitutionCatalogEntity(formData, "subject");
}

export async function updateClassroomCatalogAction(formData: FormData) {
  await updateSimpleInstitutionCatalogEntity(formData, "classroom");
}

export async function deleteInstitutionCatalogAction(formData: FormData) {
  const prisma = getPrismaClient();
  const id = getRequiredField(formData, "id");
  await prisma.institution.delete({ where: { id } });
  revalidateCatalogPaths();
}

export async function deleteAcademicPeriodCatalogAction(formData: FormData) {
  const prisma = getPrismaClient();
  const id = getRequiredField(formData, "id");
  await prisma.academicPeriod.delete({ where: { id } });
  revalidateCatalogPaths();
}

export async function deleteCampusCatalogAction(formData: FormData) {
  await deleteSimpleInstitutionCatalogEntity(formData, "campus");
}

export async function deleteShiftCatalogAction(formData: FormData) {
  await deleteSimpleInstitutionCatalogEntity(formData, "shift");
}

export async function deleteTrimesterCatalogAction(formData: FormData) {
  await deleteSimpleInstitutionCatalogEntity(formData, "trimester");
}

export async function deleteAcademicGroupCatalogAction(formData: FormData) {
  await deleteSimpleInstitutionCatalogEntity(formData, "group");
}

export async function deleteSubjectCatalogAction(formData: FormData) {
  await deleteSimpleInstitutionCatalogEntity(formData, "subject");
}

export async function deleteClassroomCatalogAction(formData: FormData) {
  await deleteSimpleInstitutionCatalogEntity(formData, "classroom");
}

type SimpleEntityType =
  | "campus"
  | "shift"
  | "trimester"
  | "group"
  | "subject"
  | "classroom";

async function createSimpleInstitutionCatalogEntity(
  formData: FormData,
  entityType: SimpleEntityType,
) {
  const prisma = getPrismaClient();
  const institutionId = getRequiredField(formData, "institutionId");
  const name = getRequiredField(formData, "name", true);

  if (entityType === "campus") {
    await prisma.campus.create({
      data: {
        institutionId,
        name,
        slug: toSlug(name),
      },
    });
  }

  if (entityType === "shift") {
    await prisma.shift.create({
      data: {
        institutionId,
        name,
        slug: toSlug(name),
      },
    });
  }

  if (entityType === "trimester") {
    await prisma.$executeRaw`
      INSERT INTO "TrimesterCatalog" (
        "id",
        "institutionId",
        "name",
        "slug",
        "isActive",
        "createdAt",
        "updatedAt"
      )
      VALUES (
        ${randomUUID()},
        ${institutionId},
        ${name},
        ${toSlug(name)},
        true,
        NOW(),
        NOW()
      )
    `;
  }

  if (entityType === "group") {
    await prisma.academicGroup.create({
      data: {
        institutionId,
        name,
        slug: toSlug(name),
      },
    });
  }

  if (entityType === "subject") {
    await prisma.subject.create({
      data: {
        institutionId,
        name,
        slug: toSlug(name),
      },
    });
  }

  if (entityType === "classroom") {
    await prisma.classroom.create({
      data: {
        institutionId,
        name,
        slug: toSlug(name),
      },
    });
  }

  revalidateCatalogPaths();
}

async function updateSimpleInstitutionCatalogEntity(
  formData: FormData,
  entityType: SimpleEntityType,
) {
  const prisma = getPrismaClient();
  const id = getRequiredField(formData, "id");
  const institutionId = getRequiredField(formData, "institutionId");
  const name = getRequiredField(formData, "name", true);

  if (entityType === "campus") {
    await prisma.campus.update({
      where: { id },
      data: {
        institutionId,
        name,
        slug: toSlug(name),
      },
    });
  }

  if (entityType === "shift") {
    await prisma.shift.update({
      where: { id },
      data: {
        institutionId,
        name,
        slug: toSlug(name),
      },
    });
  }

  if (entityType === "trimester") {
    await prisma.$executeRaw`
      UPDATE "TrimesterCatalog"
      SET
        "institutionId" = ${institutionId},
        "name" = ${name},
        "slug" = ${toSlug(name)},
        "updatedAt" = NOW()
      WHERE "id" = ${id}
    `;
  }

  if (entityType === "group") {
    await prisma.academicGroup.update({
      where: { id },
      data: {
        institutionId,
        name,
        slug: toSlug(name),
      },
    });
  }

  if (entityType === "subject") {
    await prisma.subject.update({
      where: { id },
      data: {
        institutionId,
        name,
        slug: toSlug(name),
      },
    });
  }

  if (entityType === "classroom") {
    await prisma.classroom.update({
      where: { id },
      data: {
        institutionId,
        name,
        slug: toSlug(name),
      },
    });
  }

  revalidateCatalogPaths();
}

async function deleteSimpleInstitutionCatalogEntity(
  formData: FormData,
  entityType: SimpleEntityType,
) {
  const prisma = getPrismaClient();
  const id = getRequiredField(formData, "id");

  if (entityType === "campus") {
    await prisma.campus.delete({ where: { id } });
  }

  if (entityType === "shift") {
    await prisma.shift.delete({ where: { id } });
  }

  if (entityType === "trimester") {
    await prisma.$executeRaw`
      DELETE FROM "TrimesterCatalog"
      WHERE "id" = ${id}
    `;
  }

  if (entityType === "group") {
    await prisma.academicGroup.delete({ where: { id } });
  }

  if (entityType === "subject") {
    await prisma.subject.delete({ where: { id } });
  }

  if (entityType === "classroom") {
    await prisma.classroom.delete({ where: { id } });
  }

  revalidateCatalogPaths();
}

function revalidateCatalogPaths() {
  revalidatePath("/carga-academica");
  revalidatePath("/carga-academica/nueva");
  revalidatePath("/carga-academica/catalogos");
}

function getRequiredField(
  formData: FormData,
  fieldName: string,
  uppercase = false,
) {
  const value = formData.get(fieldName);

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`El campo ${fieldName} es obligatorio.`);
  }

  const normalizedValue = value.trim();

  return uppercase ? normalizedValue.toUpperCase() : normalizedValue;
}

function getDateField(formData: FormData, fieldName: string) {
  const value = getRequiredField(formData, fieldName);
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error(`El campo ${fieldName} no tiene una fecha valida.`);
  }

  return parsedDate;
}

function getPositiveIntegerField(formData: FormData, fieldName: string) {
  const rawValue = getRequiredField(formData, fieldName);
  const parsedValue = Number(rawValue);

  if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
    throw new Error(`El campo ${fieldName} debe ser un numero entero positivo.`);
  }

  return parsedValue;
}

function toSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
