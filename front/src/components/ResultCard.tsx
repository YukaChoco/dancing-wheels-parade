import { Link } from "react-router-dom";

export function ResultCard({ to, faq }: { to: string, faq: { question: string, pageTitle: string } }): JSX.Element {
  return (
    <Link to={to}>
      <div
        className="bg-primary md:p-5 p-3 mx-2 drop-shadow-md my-2"
      >
        <h2 className="font-bold">{faq.question}</h2>
        <p className="mx-1 px-1 border-l-2">{faq.pageTitle}</p>
      </div>
    </Link>
  );
}