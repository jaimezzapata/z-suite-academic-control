import type { Session } from "next-auth";

export type PanelHomeViewModel = {
  greeting: string;
  title: string;
  description: string;
  email: string;
  initials: string;
  signOutLabel: string;
};

export function getPanelHomeViewModel(
  user: NonNullable<Session["user"]>,
): PanelHomeViewModel {
  const fallbackName = user.name?.trim() || "Docente";
  const firstName = fallbackName.split(" ")[0] || fallbackName;
  const email = user.email ?? "Sin correo disponible";

  return {
    greeting: `Hola, ${firstName}`,
    title: "Tu sesion esta activa",
    description:
      "Google ya esta conectado y el acceso a la aplicacion funciona correctamente.",
    email,
    initials: getInitials(fallbackName),
    signOutLabel: "Cerrar sesion",
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
