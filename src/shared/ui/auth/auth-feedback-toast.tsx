"use client";

import { useAuthFeedbackToast } from "@/src/shared/hooks/auth/use-auth-feedback-toast";
import type { AuthFeedbackEvent } from "@/src/shared/lib/auth/auth-feedback";

type AuthFeedbackToastProps = {
  expectedEvent: AuthFeedbackEvent;
};

export function AuthFeedbackToast({
  expectedEvent,
}: AuthFeedbackToastProps) {
  useAuthFeedbackToast(expectedEvent);

  return null;
}
