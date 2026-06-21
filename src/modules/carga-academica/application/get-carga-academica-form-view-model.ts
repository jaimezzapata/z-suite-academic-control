export type AcademicLoadFormFieldOption = {
  label: string;
  value: string;
};

export type AcademicLoadFormField = {
  label: string;
  placeholder?: string;
  fieldType?:
    | "text"
    | "textarea"
    | "select"
    | "time"
    | "date"
    | "checkbox-group";
  options?: AcademicLoadFormFieldOption[];
};

export type AcademicLoadFormSection = {
  title: string;
  description: string;
  fields: AcademicLoadFormField[];
};

export type AcademicLoadFormViewModel = {
  badge: string;
  title: string;
  description: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
  sections: AcademicLoadFormSection[];
};

export function getAcademicLoadFormViewModel(): AcademicLoadFormViewModel {
  return {
    badge: "Nueva carga academica",
    title: "Registra una carga horaria",
    description:
      "Esta version inicial se enfoca en los datos operativos reales que necesitas para registrar una carga por bloque y luego conectarla con horarios y nomina.",
    primaryActionLabel: "Guardar carga",
    secondaryActionLabel: "Volver al listado",
    sections: [
      {
        title: "Datos base",
        description:
          "Registra el contexto academico principal del bloque que te asignaron.",
        fields: [
          {
            label: "Sede",
            placeholder: "Selecciona una sede",
            fieldType: "select",
            options: [
              { label: "Poblado", value: "poblado" },
              { label: "Bello", value: "bello" },
              { label: "Envigado", value: "envigado" },
            ],
          },
          {
            label: "Jornada",
            placeholder: "Selecciona una jornada",
            fieldType: "select",
            options: [
              { label: "Manana", value: "manana" },
              { label: "Tarde", value: "tarde" },
              { label: "Noche", value: "noche" },
              { label: "Mixta", value: "mixta" },
            ],
          },
          {
            label: "Grupo",
            placeholder: "Selecciona un grupo",
            fieldType: "select",
            options: [
              { label: "Grupo A", value: "grupo-a" },
              { label: "Grupo B", value: "grupo-b" },
              { label: "Grupo C", value: "grupo-c" },
            ],
          },
          {
            label: "Materia",
            placeholder: "Selecciona una materia",
            fieldType: "select",
            options: [
              { label: "Programacion Web", value: "programacion-web" },
              { label: "Bases de Datos", value: "bases-de-datos" },
              { label: "Algoritmos", value: "algoritmos" },
            ],
          },
        ],
      },
      {
        title: "Franja horaria",
        description:
          "Define el bloque exacto con el que vas a trabajar en tu horario.",
        fields: [
          {
            label: "Fecha inicio",
            fieldType: "date",
          },
          {
            label: "Fecha fin",
            fieldType: "date",
          },
          {
            label: "Dia o dias de clase",
            fieldType: "checkbox-group",
            options: [
              { label: "Lunes", value: "lunes" },
              { label: "Martes", value: "martes" },
              { label: "Miercoles", value: "miercoles" },
              { label: "Jueves", value: "jueves" },
              { label: "Viernes", value: "viernes" },
              { label: "Sabado", value: "sabado" },
            ],
          },
          {
            label: "Hora inicio",
            fieldType: "time",
          },
          {
            label: "Hora fin",
            fieldType: "time",
          },
          {
            label: "Salon",
            placeholder: "Selecciona un salon",
            fieldType: "select",
            options: [
              { label: "Salon 201", value: "201" },
              { label: "Salon 304", value: "304" },
              { label: "Laboratorio 2", value: "lab-2" },
            ],
          },
        ],
      },
    ],
  };
}
