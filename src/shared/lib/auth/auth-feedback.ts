export const AUTH_FEEDBACK_STORAGE_KEY = "zsuite-auth-feedback";

export type AuthFeedbackEvent = "signed-in" | "signed-out";

export function setAuthFeedbackEvent(event: AuthFeedbackEvent) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(AUTH_FEEDBACK_STORAGE_KEY, event);
}

export function consumeAuthFeedbackEvent(expectedEvent: AuthFeedbackEvent) {
  if (typeof window === "undefined") {
    return null;
  }

  const storedEvent = window.sessionStorage.getItem(AUTH_FEEDBACK_STORAGE_KEY);

  if (storedEvent !== expectedEvent) {
    return null;
  }

  window.sessionStorage.removeItem(AUTH_FEEDBACK_STORAGE_KEY);

  return storedEvent;
}
