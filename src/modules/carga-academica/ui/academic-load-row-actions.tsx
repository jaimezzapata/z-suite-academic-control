"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import type { AcademicLoadActionResult } from "@/src/modules/carga-academica/application/create-academic-load-action";
import type { AcademicLoadListItem } from "@/src/modules/carga-academica/application/get-carga-academica-list-view-model";

type AcademicLoadRowActionsProps = {
  load: AcademicLoadListItem;
  onEdit: (load: AcademicLoadListItem) => void;
  onDelete: (loadId: string) => Promise<AcademicLoadActionResult>;
  onToggleStatus: (
    loadId: string,
    nextStatus: "ACTIVE" | "CANCELLED",
  ) => Promise<AcademicLoadActionResult>;
};

export function AcademicLoadRowActions({
  load,
  onEdit,
  onDelete,
  onToggleStatus,
}: AcademicLoadRowActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!window.confirm("Esta accion eliminara la asignacion. Deseas continuar?")) {
      return;
    }

    startTransition(async () => {
      const result = await onDelete(load.id);

      showResultToast("academic-load-delete", result);

      if (result.status === "success") {
        router.refresh();
      }
    });
  };

  const handleToggleStatus = () => {
    startTransition(async () => {
      const result = await onToggleStatus(
        load.id,
        load.isActive ? "CANCELLED" : "ACTIVE",
      );

      showResultToast("academic-load-status", result);

      if (result.status === "success") {
        router.refresh();
      }
    });
  };

  return (
    <div className="flex flex-wrap justify-end gap-2">
      <button
        type="button"
        onClick={() => onEdit(load)}
        disabled={isPending}
        className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Editar
      </button>
      <button
        type="button"
        onClick={handleToggleStatus}
        disabled={isPending}
        className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {load.isActive ? "Desactivar" : "Activar"}
      </button>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition-colors duration-200 hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Eliminar
      </button>
    </div>
  );
}

function showResultToast(toastId: string, result: AcademicLoadActionResult) {
  if (result.status === "success") {
    toast.success(result.message, {
      id: toastId,
    });
    return;
  }

  toast.error(result.message, {
    id: toastId,
  });
}
