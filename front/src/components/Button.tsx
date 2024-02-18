import { ReactNode } from "react";
import { Link } from "react-router-dom";

export function Button({ theme, children, link }: { theme: "primary" | "secondary", children: ReactNode, link: string }): JSX.Element {
  const colors = theme === "primary"
    ? "bg-dark text-light"
    : "bg-light text-dark";
  const styles = `${colors} w-full p-4 text-xl rounded-xl`
  return (
    <Link to={link}>
      <div className="w-full text-center p-6 px-6 md:px-24 fixed bottom-10 left-0 z-10">
        <div className={styles}>
          {children}
        </div>
      </div>
    </Link>
  );
}