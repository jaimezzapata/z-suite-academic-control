"use client";

import { useSessionSignOut } from "@/src/shared/hooks/auth/use-session-sign-out";

type SignOutButtonProps = {
  label: string;
  compact?: boolean;
};

export function SignOutButton({
  label,
  compact = false,
}: SignOutButtonProps) {
  const { handleSignOut, isPending } = useSessionSignOut();

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isPending}
      className={`flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-slate-950 font-semibold text-white transition-all duration-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-700 ${
        compact ? "px-4 py-3 text-sm" : "px-5 py-4 text-base"
      }`}
    >
      {isPending && (
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      )}
      {isPending ? "Cerrando sesion..." : label}
    </button>
  );
}
