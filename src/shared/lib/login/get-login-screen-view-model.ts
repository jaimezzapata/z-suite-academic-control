export type LoginScreenViewModel = {
  badgeText: string;
  productName: string;
  title: string;
  description: string;
  loginNote: string;
  buttonLabel: string;
  footerNote: string;
};

export function getLoginScreenViewModel(): LoginScreenViewModel {
  return {
    badgeText: "Centro de control academico y laboral",
    productName: "Z-Suite Academic Control",
    title: "Z-SUITE-ACADEMIC-CONTROL.",
    description:
      "",
    loginNote:
      "",
    buttonLabel: "Continuar con Google",
    footerNote: "",
  };
}
