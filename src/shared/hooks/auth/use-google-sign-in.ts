"use client";

import { signIn } from "next-auth/react";
import { useTransition } from "react";
import { toast } from "sonner";
import { setAuthFeedbackEvent } from "@/src/shared/lib/auth/auth-feedback";

export function useGoogleSignIn() {
  const [isPending, startTransition] = useTransition();

  const handleSignIn = () => {
    startTransition(() => {
      void beginSignIn();
    });
  };

  const beginSignIn = async () => {
    try {
      setAuthFeedbackEvent("signed-in");
      toast.loading("Abriendo Google...", {
        id: "auth-transition",
      });

      await signIn("google", {
        redirectTo: "/panel",
      });
    } catch {
      toast.error("No se pudo iniciar sesion con Google.", {
        id: "auth-transition",
      });
    }
  };

  return {
    isPending,
    handleSignIn,
  };
}
