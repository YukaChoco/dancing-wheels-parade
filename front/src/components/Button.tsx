import { ReactNode } from "react";

export function Button({ theme, disabled, children }: { theme: "primary" | "secondary", disabled?: boolean, children: ReactNode }): JSX.Element {
  const styles = theme === "primary"
    ? "bg-dark text-primary"
    : "bg-light text-dark";
  return (
    <div className="px-40">
      <button className={`${styles} w-full p-4 text-xl`} disabled={disabled}>
        {children}
      </button>
    </div>
  );
}