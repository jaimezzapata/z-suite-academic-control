"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { setAuthFeedbackEvent } from "@/src/shared/lib/auth/auth-feedback";

export function useSessionSignOut() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(() => {
      void beginSignOut();
    });
  };

  const beginSignOut = async () => {
    try {
      setAuthFeedbackEvent("signed-out");
      toast.loading("Cerrando sesion...", {
        id: "auth-transition",
      });

      await signOut({
        redirect: false,
      });

      router.push("/login");
      router.refresh();
    } catch {
      toast.error("No se pudo cerrar la sesion.", {
        id: "auth-transition",
      });
    }
  };

  return {
    isPending,
    handleSignOut,
  };
}
