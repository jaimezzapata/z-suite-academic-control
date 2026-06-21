import type { LoginScreenViewModel } from "@/src/shared/lib/login/get-login-screen-view-model";

type LoginScreenProps = {
  viewModel: LoginScreenViewModel;
};

export function LoginScreen({ viewModel }: LoginScreenProps) {
  return (
    <main className="min-h-screen bg-[#f6f7fb] text-slate-950">
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

              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-950 px-5 py-4 text-base font-semibold text-white transition-colors duration-200 hover:bg-slate-800"
              >
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
                {viewModel.buttonLabel}
              </button>

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
