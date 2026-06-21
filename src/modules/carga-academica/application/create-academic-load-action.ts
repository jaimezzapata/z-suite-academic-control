"use server";

import { auth } from "@/auth";
import { AcademicLoadStatus, ClassDay } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getPrismaClient } from "@/src/shared/lib/prisma";

export type AcademicLoadActionResult = {
  status: "success" | "error";
  message: string;
};

export async function createAcademicLoadAction(
  formData: FormData,
): Promise<AcademicLoadActionResult> {
  try {
    await ensureValidSession();
    const prisma = getPrismaClient();
    const payload = await parseAcademicLoadPayload(formData);

    await prisma.academicLoad.create({
      data: {
        ...payload,
        status: AcademicLoadStatus.ACTIVE,
      },
    });

    revalidatePath("/carga-academica");

    return {
      status: "success",
      message: "La carga academica se guardo correctamente.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "No fue posible guardar la carga academica.",
    };
  }
}

export async function updateAcademicLoadAction(
  formData: FormData,
): Promise<AcademicLoadActionResult> {
  try {
    await ensureValidSession();
    const prisma = getPrismaClient();
    const loadId = getRequiredField(formData, "loadId");
    const existingLoad = await prisma.academicLoad.findUnique({
      where: { id: loadId },
      select: { id: true },
    });

    if (!existingLoad) {
      return {
        status: "error",
        message: "La carga academica que intentas editar ya no existe.",
      };
    }

    const payload = await parseAcademicLoadPayload(formData);

    await prisma.academicLoad.update({
      where: { id: loadId },
      data: payload,
    });

    revalidatePath("/carga-academica");

    return {
      status: "success",
      message: "La carga academica se actualizo correctamente.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "No fue posible actualizar la carga academica.",
    };
  }
}

export async function deleteAcademicLoadAction(
  loadId: string,
): Promise<AcademicLoadActionResult> {
  try {
    await ensureValidSession();
    const prisma = getPrismaClient();

    await prisma.academicLoad.delete({
      where: { id: loadId },
    });

    revalidatePath("/carga-academica");

    return {
      status: "success",
      message: "La carga academica se elimino correctamente.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "No fue posible eliminar la carga academica.",
    };
  }
}

export async function toggleAcademicLoadStatusAction(
  loadId: string,
  nextStatus: "ACTIVE" | "CANCELLED",
): Promise<AcademicLoadActionResult> {
  try {
    await ensureValidSession();
    const prisma = getPrismaClient();

    await prisma.academicLoad.update({
      where: { id: loadId },
      data: {
        status: nextStatus,
      },
    });

    revalidatePath("/carga-academica");

    return {
      status: "success",
      message:
        nextStatus === "ACTIVE"
          ? "La carga academica se activo correctamente."
          : "La carga academica se desactivo correctamente.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "No fue posible actualizar el estado de la carga academica.",
    };
  }
}

async function ensureValidSession() {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Tu sesion no es valida. Inicia sesion nuevamente.");
  }
}

async function parseAcademicLoadPayload(formData: FormData) {
  const prisma = getPrismaClient();
  const periodId = getRequiredField(formData, "periodId");
  const campusId = getRequiredField(formData, "campusId");
  const shiftId = getRequiredField(formData, "shiftId");
  const groupId = getRequiredField(formData, "groupId");
  const subjectId = getRequiredField(formData, "subjectId");
  const classroomId = getRequiredField(formData, "classroomId");
  const startsOn = getDateField(formData, "startsOn");
  const endsOn = getDateField(formData, "endsOn");
  const startsAt = getRequiredField(formData, "startsAt");
  const endsAt = getRequiredField(formData, "endsAt");
  const teachingDays = getTeachingDays(formData);

  if (startsOn > endsOn) {
    throw new Error("La fecha de inicio no puede ser mayor que la fecha de fin.");
  }

  if (startsAt >= endsAt) {
    throw new Error("La hora de inicio debe ser menor que la hora de fin.");
  }

  const [period, campus, shift, group, subject, classroom] = await Promise.all([
    prisma.academicPeriod.findUnique({
      where: { id: periodId },
      select: {
        id: true,
        institutionId: true,
      },
    }),
    prisma.campus.findUnique({
      where: { id: campusId },
      select: {
        id: true,
        institutionId: true,
      },
    }),
    prisma.shift.findUnique({
      where: { id: shiftId },
      select: {
        id: true,
        institutionId: true,
      },
    }),
    prisma.academicGroup.findUnique({
      where: { id: groupId },
      select: {
        id: true,
        institutionId: true,
      },
    }),
    prisma.subject.findUnique({
      where: { id: subjectId },
      select: {
        id: true,
        institutionId: true,
      },
    }),
    prisma.classroom.findUnique({
      where: { id: classroomId },
      select: {
        id: true,
        institutionId: true,
      },
    }),
  ]);

  if (!period || !campus || !shift || !group || !subject || !classroom) {
    throw new Error(
      "Uno o varios catalogos seleccionados ya no existen. Recarga e intenta de nuevo.",
    );
  }

  const institutionId = period.institutionId;
  const sameInstitution =
    campus.institutionId === institutionId &&
    shift.institutionId === institutionId &&
    group.institutionId === institutionId &&
    subject.institutionId === institutionId &&
    classroom.institutionId === institutionId;

  if (!sameInstitution) {
    throw new Error(
      "Todos los catalogos de la carga deben pertenecer a la misma institucion del periodo.",
    );
  }

  return {
    institutionId,
    periodId,
    campusId,
    shiftId,
    groupId,
    subjectId,
    classroomId,
    startsOn,
    endsOn,
    teachingDays,
    startsAt,
    endsAt,
  };
}

function getRequiredField(formData: FormData, fieldName: string) {
  const value = formData.get(fieldName);

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`El campo ${fieldName} es obligatorio.`);
  }

  return value.trim();
}

function getDateField(formData: FormData, fieldName: string) {
  const parsedDate = new Date(getRequiredField(formData, fieldName));

  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error(`El campo ${fieldName} no tiene una fecha valida.`);
  }

  return parsedDate;
}

function getTeachingDays(formData: FormData) {
  const values = formData
    .getAll("teachingDays")
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.trim())
    .filter(Boolean);

  if (values.length === 0) {
    throw new Error("Debes seleccionar al menos un dia de clase.");
  }

  const validValues = new Set(Object.values(ClassDay));
  const uniqueValues = [...new Set(values)];

  for (const value of uniqueValues) {
    if (!validValues.has(value as ClassDay)) {
      throw new Error("Se detecto un dia de clase invalido.");
    }
  }

  return uniqueValues as ClassDay[];
}
