"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { HorariosWeekCalendarViewModel } from "@/src/modules/horarios/application/get-horarios-week-calendar-view-model";

type HorariosWeekCalendarScreenProps = {
  viewModel: HorariosWeekCalendarViewModel;
};

export function HorariosWeekCalendarScreen({
  viewModel,
}: HorariosWeekCalendarScreenProps) {
  const router = useRouter();
  const minWidth = 940;
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);

  const minutesRange = viewModel.grid.endMinute - viewModel.grid.startMinute;
  const minuteHeight = useMemo(() => {
    if (!viewportHeight || minutesRange <= 0) {
      return viewModel.grid.minuteHeight;
    }

    return viewportHeight / minutesRange;
  }, [minutesRange, viewportHeight, viewModel.grid.minuteHeight]);

  const scale = minuteHeight / viewModel.grid.minuteHeight;
  const gridHeight = viewportHeight ?? viewModel.grid.height;
  const halfHourHeight = minuteHeight * 30;

  useEffect(() => {
    const node = viewportRef.current;
    if (!node) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) {
        return;
      }

      setViewportHeight(Math.max(240, Math.floor(entry.contentRect.height)));
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const navigateToWeek = (href: string) => {
    router.push(href);
  };

  return (
    <section className="flex min-h-[calc(100vh-140px)] flex-col gap-3 text-slate-950">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-xl font-semibold leading-tight text-slate-950 sm:text-2xl">
            {viewModel.title}
          </h1>
          {viewModel.institutionLegend.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              {viewModel.institutionLegend.map((item) => (
                <div
                  key={item.institution}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full border"
                    style={{
                      background: item.color.background,
                      borderColor: item.color.border,
                    }}
                  />
                  <span>{item.institution}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <p className="text-sm font-medium text-slate-700">{viewModel.weekLabel}</p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => navigateToWeek(viewModel.navigation.previousWeekHref)}
              className="inline-flex cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50"
            >
              Semana anterior
            </button>
            <button
              type="button"
              onClick={() => navigateToWeek(viewModel.navigation.todayHref)}
              className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-slate-950 px-3.5 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-slate-800"
            >
              Hoy
            </button>
            <button
              type="button"
              onClick={() => navigateToWeek(viewModel.navigation.nextWeekHref)}
              className="inline-flex cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50"
            >
              Semana siguiente
            </button>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 rounded-[1.75rem] border border-slate-200 bg-white p-3 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-4">
        <div className="min-h-0 flex-1 overflow-x-auto overflow-y-hidden">
          <div className="flex min-h-0 flex-col" style={{ minWidth }}>
            <div className="grid grid-cols-[88px_repeat(7,minmax(0,1fr))] border-b border-slate-200">
              <div className="py-2.5" />
              {viewModel.days.map((day) => (
                <div
                  key={day.dateKey}
                  className="border-l border-slate-200 px-1.5 py-2 text-center"
                >
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">
                    {day.dayLabel}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-950">
                    {day.dateLabel}
                  </p>
                </div>
              ))}
            </div>

            <div ref={viewportRef} className="min-h-0 flex-1">
              <div className="grid grid-cols-[88px_repeat(7,minmax(0,1fr))]">
                <div className="relative" style={{ height: gridHeight }}>
                  {viewModel.hours.map((hour) => {
                    const rawTop =
                      (hour.minutes - viewModel.grid.startMinute) * minuteHeight;
                    const top = Math.min(
                      Math.max(0, rawTop - 7),
                      Math.max(0, gridHeight - 14),
                    );

                    return (
                      <div
                        key={hour.minutes}
                        className="absolute left-0 flex w-full items-start justify-end pr-3 text-[11px] font-medium text-slate-500"
                        style={{ top }}
                      >
                        {hour.label}
                      </div>
                    );
                  })}
                </div>

                {viewModel.days.map((day, dayIndex) => {
                  const dayEvents = viewModel.events.filter(
                    (event) => event.dayIndex === dayIndex,
                  );

                  return (
                    <div
                      key={day.dateKey}
                      className="relative border-l border-slate-200"
                      style={{
                        height: gridHeight,
                        backgroundImage: `repeating-linear-gradient(to bottom, rgba(226, 232, 240, 0.9) 0px, rgba(226, 232, 240, 0.9) 1px, transparent 1px, transparent ${halfHourHeight}px)`,
                      }}
                    >
                      {dayEvents.map((event) => (
                        <article
                          key={event.id}
                          className="absolute left-2 right-2 overflow-hidden rounded-2xl border px-2.5 py-2 text-[11px] shadow-[0_12px_24px_rgba(15,23,42,0.08)]"
                          style={{
                            top: event.top * scale,
                            height: event.height * scale,
                            background: event.color.background,
                            borderColor: event.color.border,
                            color: event.color.text,
                          }}
                        >
                          <p className="font-semibold leading-tight">
                            {event.title}
                          </p>
                          <p className="mt-1 leading-tight opacity-80">
                            {event.startsAt} - {event.endsAt}
                          </p>
                          <p className="mt-1 leading-tight opacity-80">
                            {event.location}
                          </p>
                          <p className="mt-1 leading-tight opacity-80">
                            {event.subtitle}
                          </p>
                        </article>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
