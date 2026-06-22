import { getHorariosWeekCalendarViewModel } from "@/src/modules/horarios/application/get-horarios-week-calendar-view-model";
import { HorariosWeekCalendarScreen } from "@/src/modules/horarios/ui/horarios-week-calendar-screen";

export const dynamic = "force-dynamic";

type HorariosPageProps = {
  searchParams?: Promise<{
    week?: string | string[];
  }>;
};

export default async function HorariosPage({ searchParams }: HorariosPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};

  const viewModel = await getHorariosWeekCalendarViewModel(resolvedSearchParams);

  return <HorariosWeekCalendarScreen viewModel={viewModel} />;
}
