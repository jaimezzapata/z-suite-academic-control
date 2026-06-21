import type { LoginScreenViewModel } from "@/src/shared/lib/login/get-login-screen-view-model";
import { AuthFeedbackToast } from "@/src/shared/ui/auth/auth-feedback-toast";
import { GoogleSignInButton } from "@/src/shared/ui/auth/google-sign-in-button";

type LoginScreenProps = {
  viewModel: LoginScreenViewModel;
};

export function LoginScreen({ viewModel }: LoginScreenProps) {
  return (
    <main className="min-h-screen bg-[#f6f7fb] text-slate-950">
      <AuthFeedbackToast expectedEvent="signed-out" />
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 py-10 lg:px-10">
        <section className="w-full max-w-md">
          <div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-10">
            <div className="mb-8 flex flex-col items-center text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950">
                <div className="grid h-8 w-8 grid-cols-2 gap-1">
                  <span className="rounded-sm bg-white" />
                  <span className="rounded-sm bg-cyan-300" />
                  <span className="rounded-sm bg-amber-300" />
                  <span className="rounded-sm bg-white" />
                </div>
              </div>

              <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-500" />
                {viewModel.badgeText}
              </div>

              <p className="mt-6 text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
                {viewModel.productName}
              </p>
              <h1 className="mt-4 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
                {viewModel.title}
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-600">
                {viewModel.description}
              </p>
            </div>

            <div className="space-y-5">
              <p className="text-center text-sm leading-7 text-slate-600">
                {viewModel.loginNote}
              </p>

              <GoogleSignInButton label={viewModel.buttonLabel} />

              <p className="text-center text-sm leading-6 text-slate-500">
                {viewModel.footerNote}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
