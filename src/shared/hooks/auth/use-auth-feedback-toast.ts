"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import {
  consumeAuthFeedbackEvent,
  type AuthFeedbackEvent,
} from "@/src/shared/lib/auth/auth-feedback";

const authFeedbackMessage: Record<AuthFeedbackEvent, string> = {
  "signed-in": "Sesion iniciada correctamente.",
  "signed-out": "Sesion cerrada correctamente.",
};

export function useAuthFeedbackToast(expectedEvent: AuthFeedbackEvent) {
  useEffect(() => {
    const feedbackEvent = consumeAuthFeedbackEvent(expectedEvent);

    if (!feedbackEvent) {
      return;
    }

    toast.success(authFeedbackMessage[feedbackEvent], {
      id: "auth-transition",
    });
  }, [expectedEvent]);
}
