"use client";

import { useState } from "react";
import type { AcademicLoadListItem } from "@/src/modules/carga-academica/application/get-carga-academica-list-view-model";

export function useAcademicLoadCreateModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState<AcademicLoadListItem | null>(null);

  const openModal = () => {
    setSelectedLoad(null);
    setIsOpen(true);
  };

  const openEditModal = (load: AcademicLoadListItem) => {
    setSelectedLoad(load);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedLoad(null);
  };

  return {
    isOpen,
    openModal,
    openEditModal,
    closeModal,
    selectedLoad,
  };
}
