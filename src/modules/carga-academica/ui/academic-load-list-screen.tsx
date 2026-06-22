"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { AcademicLoadListViewModel } from "@/src/modules/carga-academica/application/get-carga-academica-list-view-model";
import type { AcademicLoadActionResult } from "@/src/modules/carga-academica/application/create-academic-load-action";
import type { AcademicLoadListItem } from "@/src/modules/carga-academica/application/get-carga-academica-list-view-model";
import { AcademicLoadRowActions } from "@/src/modules/carga-academica/ui/academic-load-row-actions";

type AcademicLoadListScreenProps = {
  viewModel: AcademicLoadListViewModel;
  onOpenCreateModal: () => void;
  onOpenEditModal: (load: AcademicLoadListItem) => void;
  onDelete: (loadId: string) => Promise<AcademicLoadActionResult>;
  onToggleStatus: (
    loadId: string,
    nextStatus: "ACTIVE" | "CANCELLED",
  ) => Promise<AcademicLoadActionResult>;
};

export function AcademicLoadListScreen({
  viewModel,
  onOpenCreateModal,
  onOpenEditModal,
  onDelete,
  onToggleStatus,
}: AcademicLoadListScreenProps) {
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("all");

  const institutionOptions = useMemo(() => {
    return [...new Set(viewModel.loads.map((load) => load.institution))].sort((left, right) =>
      left.localeCompare(right, "es"),
    );
  }, [viewModel.loads]);

  const periodOptions = useMemo(() => {
    return [...new Set(viewModel.loads.map((load) => load.period))].sort((left, right) =>
      right.localeCompare(left, "es"),
    );
  }, [viewModel.loads]);

  const filteredLoads = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return viewModel.loads.filter((load) => {
      const matchesInstitution =
        selectedInstitution === "all" || load.institution === selectedInstitution;
      const matchesStatus = selectedStatus === "all" || load.status === selectedStatus;
      const matchesPeriod = selectedPeriod === "all" || load.period === selectedPeriod;
      const haystack =
        `${load.subject} ${load.group} ${load.institution} ${load.period} ${load.campus} ${load.room} ${load.shift} ${load.daysLabel}`.toLowerCase();
      const matchesSearch =
        normalizedSearch.length === 0 || haystack.includes(normalizedSearch);

      return (
        matchesInstitution &&
        matchesStatus &&
        matchesPeriod &&
        matchesSearch
      );
    });
  }, [searchTerm, selectedInstitution, selectedStatus, selectedPeriod, viewModel.loads]);

  const activeFiltersCount =
    (searchTerm.length > 0 ? 1 : 0) +
    (selectedInstitution !== "all" ? 1 : 0) +
    (selectedStatus !== "all" ? 1 : 0) +
    (selectedPeriod !== "all" ? 1 : 0);

  return (
    <section className="space-y-4 text-slate-950">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-semibold leading-tight text-slate-950 sm:text-2xl">
          {viewModel.title}
        </h1>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              aria-pressed={viewMode === "table"}
              className={`inline-flex min-w-24 cursor-pointer items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-200 ${
                viewMode === "table"
                  ? "bg-slate-950 text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Tabla
            </button>
            <button
              type="button"
              onClick={() => setViewMode("cards")}
              aria-pressed={viewMode === "cards"}
              className={`inline-flex min-w-24 cursor-pointer items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-200 ${
                viewMode === "cards"
                  ? "bg-slate-950 text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Cards
            </button>
          </div>
          <button
            type="button"
            onClick={() => setIsFilterModalOpen(true)}
            className={`inline-flex cursor-pointer items-center justify-center rounded-2xl border px-3.5 py-2 text-sm font-semibold transition-colors duration-200 ${
              activeFiltersCount > 0
                ? "border-slate-950 bg-slate-950 text-white hover:bg-slate-800"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {activeFiltersCount > 0
              ? `Filtros (${activeFiltersCount})`
              : "Filtrar"}
          </button>

          <Link
            href={viewModel.secondaryActionHref}
            className="inline-flex cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50"
          >
            {viewModel.secondaryActionLabel}
          </Link>
          <button
            type="button"
            onClick={onOpenCreateModal}
            className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-slate-950 px-3.5 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-slate-800"
          >
            {viewModel.primaryActionLabel}
          </button>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        {viewModel.summary.map((item) => {
          const cardStyles = getSummaryCardStyles(item.label);

          return (
            <article
              key={item.label}
              className={`rounded-3xl border p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] ${cardStyles.container}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p
                    className={`text-[11px] font-medium uppercase tracking-[0.22em] ${cardStyles.eyebrow}`}
                  >
                    {item.label}
                  </p>
                  <p
                    className={`mt-2 text-xl font-semibold tracking-tight ${cardStyles.value}`}
                  >
                    {item.value}
                  </p>
                </div>
                <span
                  className={`mt-1 h-2.5 w-2.5 rounded-full ${cardStyles.dot}`}
                  aria-hidden="true"
                />
              </div>
              <p className={`mt-1.5 text-sm leading-6 ${cardStyles.helper}`}>
                {item.helper}
              </p>
            </article>
          );
        })}
      </div>

      {filteredLoads.length === 0 ? (
        <div className="rounded-4xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
          <h2 className="text-xl font-semibold text-slate-950">
            {viewModel.loads.length === 0
              ? viewModel.emptyState.title
              : "No hay resultados con esos filtros"}
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-600">
            {viewModel.loads.length === 0
              ? viewModel.emptyState.description
              : "Prueba otra institucion, estado o termino de busqueda."}
          </p>
          {viewModel.loads.length === 0 ? (
            <button
              type="button"
              onClick={onOpenCreateModal}
              className="mt-6 inline-flex cursor-pointer items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-slate-800"
            >
              {viewModel.emptyState.actionLabel}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedInstitution("all");
                setSelectedStatus("all");
                setSelectedPeriod("all");
              }}
              className="mt-6 inline-flex cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      ) : (
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-3 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-4">
          {viewMode === "table" ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-1.5">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-[0.2em] text-slate-500">
                    <th className="px-3 py-1.5 font-medium">Materia</th>
                    <th className="px-3 py-1.5 font-medium">Institucion</th>
                    <th className="px-3 py-1.5 font-medium">Periodo</th>
                    <th className="px-3 py-1.5 font-medium">Grupo</th>
                    <th className="px-3 py-1.5 font-medium">Horario</th>
                    <th className="px-3 py-1.5 font-medium">Ubicacion</th>
                    <th className="px-3 py-1.5 font-medium">Estado</th>
                    <th className="px-3 py-1.5 font-medium text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLoads.map((load) => (
                    <tr key={load.id} className="rounded-2xl bg-slate-50 text-sm">
                      <td className="rounded-l-2xl px-3 py-3">
                        <div>
                          <p className="font-semibold text-slate-950">
                            {load.subject}
                          </p>
                          <p className="mt-1 text-slate-500">
                            {load.shift} · {load.daysLabel}
                          </p>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-slate-700">
                        {load.institution}
                      </td>
                      <td className="px-3 py-3 text-slate-700">{load.period}</td>
                      <td className="px-3 py-3 text-slate-700">{load.group}</td>
                      <td className="px-3 py-3 text-slate-700">
                        <p>
                          {load.startTime} - {load.endTime}
                        </p>
                        <p className="mt-1 text-slate-500">
                          Equivale a {load.recognizedHoursLabel} semanales
                        </p>
                      </td>
                      <td className="px-3 py-3 text-slate-700">
                        <p>{load.campus}</p>
                        <p className="mt-1 text-slate-500">Salon {load.room}</p>
                      </td>
                      <td className="rounded-r-2xl px-3 py-3">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusBadgeStyles(load.status)}`}
                        >
                          {load.status}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <AcademicLoadRowActions
                          load={load}
                          onEdit={onOpenEditModal}
                          onDelete={onDelete}
                          onToggleStatus={onToggleStatus}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {filteredLoads.map((load) => (
                <article
                  key={load.id}
                  className={`rounded-[1.125rem] border px-3 py-2.5 shadow-[0_10px_24px_rgba(15,23,42,0.04)] ${getLoadCardStyles(load.institution).container}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p
                        className={`truncate text-base font-semibold tracking-tight ${getLoadCardStyles(load.institution).title}`}
                      >
                        {load.subject}
                      </p>
                      <p
                        className={`mt-0.5 truncate text-xs ${getLoadCardStyles(load.institution).meta}`}
                      >
                        {load.group} · {load.institution}
                      </p>
                    </div>
                    <span
                      className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${getStatusBadgeStyles(load.status)}`}
                    >
                      {load.status}
                    </span>
                  </div>

                  <div className={`mt-2.5 space-y-1.5 text-xs ${getLoadCardStyles(load.institution).meta}`}>
                    <p className="truncate">
                      <span className={`font-medium ${getLoadCardStyles(load.institution).label}`}>Periodo:</span>{" "}
                      {load.period}
                    </p>
                    <p className="truncate">
                      <span className={`font-medium ${getLoadCardStyles(load.institution).label}`}>Horario:</span>{" "}
                      {load.startTime} - {load.endTime}
                    </p>
                    <p className="truncate">
                      <span className={`font-medium ${getLoadCardStyles(load.institution).label}`}>Detalle:</span>{" "}
                      {load.shift} · {load.daysLabel}
                    </p>
                    <p className="truncate">
                      <span className={`font-medium ${getLoadCardStyles(load.institution).label}`}>Salon:</span>{" "}
                      {load.campus} · {load.room}
                    </p>
                    <p className="truncate">
                      <span className={`font-medium ${getLoadCardStyles(load.institution).label}`}>Horas:</span>{" "}
                      {load.recognizedHoursLabel}
                    </p>
                  </div>

                  <div className="mt-2.5 flex justify-end">
                    <AcademicLoadRowActions
                      load={load}
                      onEdit={onOpenEditModal}
                      onDelete={onDelete}
                      onToggleStatus={onToggleStatus}
                    />
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      )}

      {isFilterModalOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/30 p-3 backdrop-blur-sm sm:flex sm:items-center sm:justify-center">
          <div
            className="absolute inset-0"
            onClick={() => setIsFilterModalOpen(false)}
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto w-full max-w-xl rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-4 py-4 sm:px-5">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500">
                  Filtros
                </p>
                <h3 className="mt-1.5 text-lg font-semibold text-slate-950">
                  Filtrar carga academica
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Busca por materia, grupo, periodo o filtra por institucion y estado.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition-colors duration-200 hover:bg-slate-50"
                aria-label="Cerrar filtros"
              >
                <span className="text-lg leading-none">x</span>
              </button>
            </div>

            <div className="grid gap-4 px-4 py-4 sm:px-5 sm:py-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Buscar
                </span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Ejemplo: WEB, G1, Bello, 2026"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-slate-400"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Institucion
                  </span>
                  <select
                    value={selectedInstitution}
                    onChange={(event) => setSelectedInstitution(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition-colors duration-200 focus:border-slate-400"
                  >
                    <option value="all">Todas</option>
                    {institutionOptions.map((institution) => (
                      <option key={institution} value={institution}>
                        {institution}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Periodo
                  </span>
                  <select
                    value={selectedPeriod}
                    onChange={(event) => setSelectedPeriod(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition-colors duration-200 focus:border-slate-400"
                  >
                    <option value="all">Todos</option>
                    {periodOptions.map((period) => (
                      <option key={period} value={period}>
                        {period}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Estado
                  </span>
                  <select
                    value={selectedStatus}
                    onChange={(event) => setSelectedStatus(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition-colors duration-200 focus:border-slate-400"
                  >
                    <option value="all">Todos</option>
                    <option value="Activa">Activa</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Completada">Completada</option>
                    <option value="Inactiva">Inactiva</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-2 border-t border-slate-200 bg-white px-4 py-4 sm:flex-row sm:justify-end sm:px-5">
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedInstitution("all");
                  setSelectedPeriod("all");
                  setSelectedStatus("all");
                }}
                className="inline-flex cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50"
              >
                Limpiar
              </button>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-slate-800"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function getSummaryCardStyles(label: string) {
  const key = label.trim().toLowerCase();

  if (key === "cesde") {
    return {
      container: "border-sky-200 bg-sky-50/80",
      eyebrow: "text-sky-700",
      value: "text-sky-950",
      helper: "text-sky-800/80",
      dot: "bg-sky-500",
    };
  }

  if (key === "sena") {
    return {
      container: "border-emerald-200 bg-emerald-50/80",
      eyebrow: "text-emerald-700",
      value: "text-emerald-950",
      helper: "text-emerald-800/80",
      dot: "bg-emerald-500",
    };
  }

  return {
    container: "border-slate-200 bg-slate-950",
    eyebrow: "text-slate-300",
    value: "text-white",
    helper: "text-slate-200/80",
    dot: "bg-cyan-300",
  };
}

function getLoadCardStyles(institution: string) {
  const key = institution.trim().toLowerCase();

  if (key.includes("cesde")) {
    return {
      container:
        "border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-cyan-50/70",
      title: "text-slate-950",
      label: "text-cyan-800",
      meta: "text-slate-600",
    };
  }

  if (key.includes("sena")) {
    return {
      container:
        "border-amber-200 bg-gradient-to-br from-amber-50 via-white to-amber-50/70",
      title: "text-slate-950",
      label: "text-amber-800",
      meta: "text-slate-600",
    };
  }

  return {
    container:
      "border-slate-200 bg-gradient-to-br from-slate-50 via-white to-cyan-50/30",
    title: "text-slate-950",
    label: "text-slate-800",
    meta: "text-slate-600",
  };
}

function getStatusBadgeStyles(status: AcademicLoadListItem["status"]) {
  if (status === "Activa") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (status === "Pendiente") {
    return "bg-amber-100 text-amber-700";
  }

  if (status === "Completada") {
    return "bg-sky-100 text-sky-700";
  }

  return "bg-rose-100 text-rose-700";
}
