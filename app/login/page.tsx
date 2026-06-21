import { getLoginScreenViewModel } from "@/src/shared/lib/login/get-login-screen-view-model";
import { LoginScreen } from "@/src/shared/ui/login-screen";

export default function LoginPage() {
  const viewModel = getLoginScreenViewModel();

  return <LoginScreen viewModel={viewModel} />;
}
