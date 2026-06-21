import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getLoginScreenViewModel } from "@/src/shared/lib/login/get-login-screen-view-model";
import { LoginScreen } from "@/src/shared/ui/login-screen";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/panel");
  }

  const viewModel = getLoginScreenViewModel();

  return <LoginScreen viewModel={viewModel} />;
}
