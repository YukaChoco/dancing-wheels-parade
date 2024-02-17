import { ReactNode } from "react";

export function Button({ theme, disabled, children }: { theme: "primary" | "secondary", disabled?: boolean, children: ReactNode }): JSX.Element {
  const styles = theme === "primary"
    ? "bg-dark"
    : "bg-light";
  return (
    <button className={styles} disabled={disabled}>
      {children}
    </button>
  );
}