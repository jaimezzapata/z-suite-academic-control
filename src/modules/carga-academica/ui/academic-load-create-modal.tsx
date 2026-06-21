"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import type { AcademicLoadActionResult } from "@/src/modules/carga-academica/application/create-academic-load-action";
import type {
  AcademicLoadFormValues,
  AcademicLoadFormViewModel,
} from "@/src/modules/carga-academica/application/get-carga-academica-form-view-model";
import { AcademicLoadFormSections } from "@/src/modules/carga-academica/ui/academic-load-form-sections";

type AcademicLoadCreateModalProps = {
  viewModel: AcademicLoadFormViewModel;
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  values?: AcademicLoadFormValues;
  loadId?: string;
  submitAction: (formData: FormData) => Promise<AcademicLoadActionResult>;
};

export function AcademicLoadCreateModal({
  viewModel,
  isOpen,
  onClose,
  mode,
  values,
  loadId,
  submitAction,
}: AcademicLoadCreateModalProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  if (!isOpen) {
    return null;
  }

  const modalCopy =
    mode === "edit"
      ? {
          badge: "Editar carga academica",
          title: "Actualiza la asignacion",
          description:
            "Modifica la informacion operativa de la carga y conserva la relacion con los catalogos existentes.",
          primaryActionLabel: "Guardar cambios",
        }
      : {
          badge: viewModel.badge,
          title: viewModel.title,
          description: viewModel.description,
          primaryActionLabel: viewModel.primaryActionLabel,
        };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/30 p-3 backdrop-blur-sm sm:flex sm:items-center sm:justify-center sm:p-5">
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[960px] flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-[#f6f7fb] shadow-[0_24px_80px_rgba(15,23,42,0.16)] max-h-[calc(100dvh-1.5rem)] sm:rounded-[1.75rem] lg:max-w-5xl">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-200 bg-white px-4 py-3 sm:px-5 sm:py-4 lg:px-6">
          <div className="max-w-2xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500">
              {modalCopy.badge}
            </p>
            <h2 className="mt-1.5 text-lg font-semibold tracking-tight text-slate-950 sm:text-2xl">
              {modalCopy.title}
            </h2>
            <p className="mt-1.5 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
              {modalCopy.description}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition-colors duration-200 hover:bg-slate-50"
            aria-label="Cerrar modal"
          >
            <span className="text-lg leading-none">×</span>
          </button>
        </div>

        <form
          action={async (formData) => {
            setIsSubmitting(true);
            setFormError(null);

            const result = await submitAction(formData);

            if (result.status === "success") {
              toast.success(result.message, {
                id: "academic-load-create",
              });
              onClose();
              router.refresh();
            } else {
              setFormError(result.message);
              toast.error(result.message, {
                id: "academic-load-create",
              });
            }

            setIsSubmitting(false);
          }}
          key={loadId ?? "new-academic-load"}
          className="flex min-h-0 flex-1 flex-col"
        >
          {mode === "edit" && loadId ? <input type="hidden" name="loadId" value={loadId} /> : null}
          <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-5">
            <AcademicLoadFormSections
              sections={viewModel.sections}
              compact
              disabled={isSubmitting}
              values={values}
            />
            {formError ? (
              <p className="mt-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {formError}
              </p>
            ) : null}
          </div>

          <div className="sticky bottom-0 flex flex-col gap-2 border-t border-slate-200 bg-white px-3 py-3 sm:flex-row sm:justify-end sm:px-5 lg:px-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50 sm:w-auto"
            >
              {viewModel.secondaryActionLabel}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
            >
              {isSubmitting ? "Guardando..." : modalCopy.primaryActionLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
