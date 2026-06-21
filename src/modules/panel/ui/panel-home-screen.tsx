import type { PanelHomeViewModel } from "@/src/modules/panel/application/get-panel-home-view-model";
import { AuthFeedbackToast } from "@/src/shared/ui/auth/auth-feedback-toast";
import { SignOutButton } from "@/src/shared/ui/auth/sign-out-button";

type PanelHomeScreenProps = {
  viewModel: PanelHomeViewModel;
};

export function PanelHomeScreen({ viewModel }: PanelHomeScreenProps) {
  return (
    <main className="min-h-screen bg-[#f6f7fb] text-slate-950">
      <AuthFeedbackToast expectedEvent="signed-in" />
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 py-10 lg:px-10">
        <section className="w-full max-w-xl">
          <div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-10">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-950 text-lg font-semibold text-white">
                {viewModel.initials}
              </div>

              <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
                {viewModel.greeting}
              </p>
              <h1 className="mt-4 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
                {viewModel.title}
              </h1>
              <p className="mt-4 max-w-md text-base leading-7 text-slate-600">
                {viewModel.description}
              </p>

              <div className="mt-8 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-left">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
                  Cuenta activa
                </p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  {viewModel.email}
                </p>
              </div>

              <div className="mt-8 w-full">
                <SignOutButton label={viewModel.signOutLabel} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
