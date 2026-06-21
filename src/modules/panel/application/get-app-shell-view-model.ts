import type { Session } from "next-auth";

type AppShellNavigationItem = {
  href: string;
  label: string;
  shortLabel: string;
  isAvailable: boolean;
};

export type AppShellViewModel = {
  productName: string;
  productSubtitle: string;
  navigationItems: AppShellNavigationItem[];
  profile: {
    name: string;
    email: string;
    initials: string;
    imageUrl: string | null;
    signOutLabel: string;
  };
};

export function getAppShellViewModel(
  user: NonNullable<Session["user"]>,
): AppShellViewModel {
  const fallbackName = user.name?.trim() || "Docente";
  const email = user.email ?? "Sin correo disponible";

  return {
    productName: "Z-Suite",
    productSubtitle: "Control academico y laboral",
    navigationItems: [
      createNavigationItem("/panel", "Panel", true),
      createNavigationItem("/instituciones", "Instituciones", false),
      createNavigationItem("/periodos", "Periodos", false),
      createNavigationItem("/carga-academica", "Carga academica", true),
      createNavigationItem("/horarios", "Horarios", false),
      createNavigationItem("/nomina", "Nomina", false),
      createNavigationItem("/pendientes", "Pendientes", false),
      createNavigationItem("/examenes", "Examenes", false),
      createNavigationItem("/documentos", "Documentos", false),
      createNavigationItem("/drive", "Drive", false),
    ],
    profile: {
      name: fallbackName,
      email,
      initials: getInitials(fallbackName),
      imageUrl: user.image ?? null,
      signOutLabel: "Cerrar sesion",
    },
  };
}

function createNavigationItem(
  href: string,
  label: string,
  isAvailable: boolean,
): AppShellNavigationItem {
  return {
    href,
    label,
    shortLabel: label.charAt(0).toUpperCase(),
    isAvailable,
  };
}

function getInitials(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
