import { getAcademicCatalogSnapshot } from "@/src/modules/carga-academica/infrastructure/academic-catalogs-repository";

type CatalogOption = {
  label: string;
  value: string;
};

type CatalogListItem = {
  id: string;
  title: string;
  meta: string;
  formValues: Record<string, string>;
};

export type AcademicCatalogsViewModel = {
  badge: string;
  title: string;
  description: string;
  summary: Array<{
    label: string;
    value: string;
    helper: string;
  }>;
  institutionOptions: CatalogOption[];
  sections: {
    institutions: {
      items: CatalogListItem[];
    };
    periods: {
      items: CatalogListItem[];
    };
    campuses: {
      items: CatalogListItem[];
    };
    shifts: {
      items: CatalogListItem[];
    };
    trimesters: {
      items: CatalogListItem[];
    };
    groups: {
      items: CatalogListItem[];
    };
    subjects: {
      items: CatalogListItem[];
    };
    classrooms: {
      items: CatalogListItem[];
    };
  };
};

export async function getAcademicCatalogsViewModel(): Promise<AcademicCatalogsViewModel> {
  const snapshot = await getAcademicCatalogSnapshot();

  return {
    badge: "Catalogos base",
    title: "Gestiona los catalogos reutilizables",
    description:
      "Desde aqui puedes crear y revisar las instituciones, periodos, sedes, jornadas, grupos, materias y salones que luego reutilizas en los formularios operativos.",
    summary: [
      {
        label: "Instituciones",
        value: String(snapshot.institutions.length),
        helper: "Base para periodos y catalogos dependientes",
      },
      {
        label: "Catalogos activos",
        value: String(
          snapshot.campuses.length +
            snapshot.shifts.length +
            snapshot.trimesters.length +
            snapshot.groups.length +
            snapshot.subjects.length +
            snapshot.classrooms.length,
        ),
        helper: "Sedes, jornadas, trimestres, grupos, materias y salones",
      },
      {
        label: "Periodos",
        value: String(snapshot.periods.length),
        helper: "Relacionados directamente con cada institucion",
      },
    ],
    institutionOptions: snapshot.institutions.map((institution) => ({
      label: institution.name,
      value: institution.id,
    })),
    sections: {
      institutions: {
        items: snapshot.institutions.map((institution) => ({
          id: institution.id,
          title: institution.name,
          meta: [
            getPeriodTypeLabel(institution.periodType),
            `Hora academica ${institution.academicHourMinutes} min`,
            getPaymentFrequencyLabel(institution.paymentFrequency),
            getPaymentModelLabel(institution.paymentModel),
            getContractTypeLabel(institution.contractType),
          ].join(" · "),
          formValues: {
            name: institution.name,
            periodType: institution.periodType,
            academicHourMinutes: String(institution.academicHourMinutes),
            paymentFrequency: institution.paymentFrequency,
            paymentModel: institution.paymentModel,
            contractType: institution.contractType,
          },
        })),
      },
      periods: {
        items: snapshot.periods.map((period) => ({
          id: period.id,
          title: `${period.institution.name} · ${period.label}`,
          meta: `${period.year} · ${formatDate(period.startsOn)} al ${formatDate(period.endsOn)}`,
          formValues: {
            institutionId: period.institutionId,
            label: period.label,
            year: String(period.year),
            startsOn: toInputDate(period.startsOn),
            endsOn: toInputDate(period.endsOn),
          },
        })),
      },
      campuses: {
        items: snapshot.campuses.map((campus) => ({
          id: campus.id,
          title: campus.name,
          meta: campus.institution.name,
          formValues: {
            institutionId: campus.institutionId,
            name: campus.name,
          },
        })),
      },
      shifts: {
        items: snapshot.shifts.map((shift) => ({
          id: shift.id,
          title: shift.name,
          meta: shift.institution.name,
          formValues: {
            institutionId: shift.institutionId,
            name: shift.name,
          },
        })),
      },
      trimesters: {
        items: snapshot.trimesters.map((trimester) => ({
          id: trimester.id,
          title: trimester.name,
          meta: trimester.institution.name,
          formValues: {
            institutionId: trimester.institutionId,
            name: trimester.name,
          },
        })),
      },
      groups: {
        items: snapshot.groups.map((group) => ({
          id: group.id,
          title: group.name,
          meta: group.institution.name,
          formValues: {
            institutionId: group.institutionId,
            name: group.name,
          },
        })),
      },
      subjects: {
        items: snapshot.subjects.map((subject) => ({
          id: subject.id,
          title: subject.name,
          meta: subject.institution.name,
          formValues: {
            institutionId: subject.institutionId,
            name: subject.name,
          },
        })),
      },
      classrooms: {
        items: snapshot.classrooms.map((classroom) => ({
          id: classroom.id,
          title: classroom.name,
          meta: classroom.institution.name,
          formValues: {
            institutionId: classroom.institutionId,
            name: classroom.name,
          },
        })),
      },
    },
  };
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(value);
}

function toInputDate(value: Date) {
  return value.toISOString().slice(0, 10);
}

function getPeriodTypeLabel(value: "SEMESTER" | "TRIMESTER" | "SPECIAL") {
  const labels = {
    SEMESTER: "Semestral",
    TRIMESTER: "Trimestral",
    SPECIAL: "Especial",
  };

  return labels[value];
}

function getPaymentFrequencyLabel(value: "BIWEEKLY" | "MONTHLY") {
  return value === "BIWEEKLY" ? "Pago quincenal" : "Pago mensual";
}

function getPaymentModelLabel(value: "HOURLY" | "FIXED") {
  return value === "HOURLY" ? "Valor hora" : "Valor fijo";
}

function getContractTypeLabel(value: "FIXED_TERM" | "SERVICE_CONTRACT") {
  return value === "FIXED_TERM" ? "Contrato fijo" : "Prestacion de servicios";
}
