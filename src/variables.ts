interface SetCSSVariablesProps {
  rows: number;
  cols: number;
}

export function setCSSVariables({ rows, cols }: SetCSSVariablesProps) {
  const root = document.querySelector<HTMLElement>(":root")!;

  root.style.setProperty("--rows", String(rows));
  root.style.setProperty("--cols", String(cols));
}
