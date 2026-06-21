import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getPanelHomeViewModel } from "@/src/modules/panel/application/get-panel-home-view-model";
import { PanelHomeScreen } from "@/src/modules/panel/ui/panel-home-screen";

export default async function PanelPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const viewModel = getPanelHomeViewModel(session.user);

  return <PanelHomeScreen viewModel={viewModel} />;
}
