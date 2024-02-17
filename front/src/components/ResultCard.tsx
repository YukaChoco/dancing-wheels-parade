import { Link } from "react-router-dom";

export function ResultCard({ to, question }: { to: string, question: string }): JSX.Element {
  return (
    <Link to={to}>
      <div
        className="bg-primary p-5 mx-2"
      >
        {question}
      </div>
    </Link>
  );
}