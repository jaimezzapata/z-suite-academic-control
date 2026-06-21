import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAppShellViewModel } from "@/src/modules/panel/application/get-app-shell-view-model";
import { AppShell } from "@/src/modules/panel/ui/app-shell";

export default async function ProtectedAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const viewModel = getAppShellViewModel(session.user);

  return <AppShell viewModel={viewModel}>{children}</AppShell>;
}
