"use client";

import { Toaster } from "sonner";

export function AppToaster() {
  return (
    <Toaster
      position="top-center"
      richColors
      toastOptions={{
        classNames: {
          toast:
            "border border-slate-200 bg-white text-slate-950 shadow-[0_18px_50px_rgba(15,23,42,0.08)]",
          title: "text-sm font-medium text-slate-950",
          description: "text-sm text-slate-600",
        },
      }}
    />
  );
}
