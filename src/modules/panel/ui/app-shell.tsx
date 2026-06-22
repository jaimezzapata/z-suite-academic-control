"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppShellSidebar } from "@/src/shared/hooks/layout/use-app-shell-sidebar";
import type { AppShellViewModel } from "@/src/modules/panel/application/get-app-shell-view-model";
import { SignOutButton } from "@/src/shared/ui/auth/sign-out-button";

type AppShellProps = {
  viewModel: AppShellViewModel;
  children: React.ReactNode;
};

export function AppShell({ viewModel, children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { closeSidebar, isSidebarOpen, toggleSidebar } = useAppShellSidebar();

  useEffect(() => {
    for (const item of viewModel.navigationItems) {
      if (item.isAvailable) {
        router.prefetch(item.href);
      }
    }
  }, [router, viewModel.navigationItems]);

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-slate-950">
      <div className="flex min-h-screen">
        <div
          className={`fixed inset-0 z-30 bg-slate-950/20 transition-opacity duration-200 lg:hidden ${
            isSidebarOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
          onClick={closeSidebar}
        />

        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-[min(80vw,290px)] flex-col border-r border-slate-200 bg-white p-3 shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition-transform duration-200 lg:w-[clamp(220px,17vw,260px)] lg:translate-x-0 lg:shadow-none ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between rounded-[1.75rem] bg-slate-950 px-3 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 grid-cols-2 gap-1 rounded-xl bg-white/8 p-1.5">
                <span className="rounded-sm bg-white" />
                <span className="rounded-sm bg-cyan-300" />
                <span className="rounded-sm bg-amber-300" />
                <span className="rounded-sm bg-white" />
              </div>
              <div>
                <p className="text-base font-semibold tracking-tight">
                  {viewModel.productName}
                </p>
                <p className="text-xs text-slate-300">
                  {viewModel.productSubtitle}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeSidebar}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 text-white lg:hidden"
              aria-label="Cerrar menu lateral"
            >
              <span className="text-lg leading-none">×</span>
            </button>
          </div>

          <div className="mt-5 flex-1">
            <div className="flex items-center gap-2 px-1">
              <span className="h-2 w-2 rounded-full bg-cyan-500" />
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500">
                Navegacion
              </p>
            </div>

            <nav className="mt-2 space-y-0.5">
              {viewModel.navigationItems.map((item) => {
                const isActive = pathname === item.href;

                if (!item.isAvailable) {
                  return (
                    <div
                      key={item.href}
                      className="flex cursor-default items-center justify-between rounded-xl px-2.5 py-2 text-slate-400 transition-colors duration-200 hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-semibold text-slate-400 shadow-sm">
                          {item.shortLabel}
                        </span>
                        <span className="text-[13px] font-medium tracking-tight">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
                        Pronto
                      </span>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch
                    onClick={closeSidebar}
                    onMouseEnter={() => router.prefetch(item.href)}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-xl px-2.5 py-2 transition-colors duration-200 ${
                      isActive
                        ? "bg-slate-100 text-slate-950"
                        : "bg-transparent text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold ${
                        isActive
                          ? "bg-slate-950 text-white"
                          : "bg-white text-slate-700 shadow-sm"
                      }`}
                    >
                      {item.shortLabel}
                    </span>
                    <span className="text-[13px] font-medium tracking-tight">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-5 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center gap-3">
              {viewModel.profile.imageUrl ? (
                <Image
                  src={viewModel.profile.imageUrl}
                  alt={`Foto de perfil de ${viewModel.profile.name}`}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-xl object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-xs font-semibold text-white">
                  {viewModel.profile.initials}
                </div>
              )}
              <div className="min-w-0">
                <p className="truncate text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  Cuenta activa
                </p>
                <p className="truncate text-sm font-semibold text-slate-950">
                  {viewModel.profile.name}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {viewModel.profile.email}
                </p>
              </div>
            </div>

            <div className="mt-3">
              <SignOutButton
                label={viewModel.profile.signOutLabel}
                compact
              />
            </div>
          </div>
        </aside>

        <div className="flex min-h-screen min-w-0 flex-1 flex-col lg:pl-[clamp(220px,17vw,260px)]">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-[#f6f7fb]/90 backdrop-blur">
            <div className="flex items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleSidebar}
                  className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 lg:hidden"
                  aria-label="Abrir menu lateral"
                >
                  <span className="space-y-1.5">
                    <span className="block h-0.5 w-5 bg-current" />
                    <span className="block h-0.5 w-5 bg-current" />
                    <span className="block h-0.5 w-5 bg-current" />
                  </span>
                </button>

                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500">
                    Panel
                  </p>
                  <p className="text-xs text-slate-600 sm:text-sm">
                    Sidebar persistente y base para toda la aplicacion
                  </p>
                </div>
              </div>

              <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 sm:flex">
                <div className="h-2.5 w-2.5 rounded-full bg-cyan-500" />
                <p className="text-xs font-medium text-slate-700">
                  Sesion activa
                </p>
              </div>
            </div>
          </header>

          <main className="min-w-0 flex-1 px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
