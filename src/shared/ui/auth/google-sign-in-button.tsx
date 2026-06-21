"use client";

import { useGoogleSignIn } from "@/src/shared/hooks/auth/use-google-sign-in";

type GoogleSignInButtonProps = {
  label: string;
};

export function GoogleSignInButton({ label }: GoogleSignInButtonProps) {
  const { handleSignIn, isPending } = useGoogleSignIn();

  return (
    <button
      type="button"
      onClick={handleSignIn}
      disabled={isPending}
      className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-slate-950 px-5 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-700"
    >
      {isPending ? (
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      ) : (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
        >
          <path
            d="M21.81 12.23c0-.68-.06-1.34-.17-1.97H12v3.73h5.51a4.72 4.72 0 0 1-2.05 3.1v2.58h3.31c1.94-1.79 3.04-4.43 3.04-7.44Z"
            fill="#4285F4"
          />
          <path
            d="M12 22c2.76 0 5.07-.91 6.76-2.47l-3.31-2.58c-.92.62-2.09.99-3.45.99-2.65 0-4.89-1.79-5.69-4.2H2.89v2.66A10 10 0 0 0 12 22Z"
            fill="#34A853"
          />
          <path
            d="M6.31 13.74A5.96 5.96 0 0 1 6 12c0-.61.11-1.21.31-1.74V7.6H2.89A10 10 0 0 0 2 12c0 1.61.38 3.13 1.05 4.4l3.26-2.66Z"
            fill="#FBBC05"
          />
          <path
            d="M12 6.06c1.5 0 2.84.52 3.89 1.53l2.91-2.91C17.06 3.06 14.75 2 12 2A10 10 0 0 0 2.89 7.6l3.42 2.66c.8-2.41 3.04-4.2 5.69-4.2Z"
            fill="#EA4335"
          />
        </svg>
      )}
      {isPending ? "Redirigiendo..." : label}
    </button>
  );
}
