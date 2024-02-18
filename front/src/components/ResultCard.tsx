import { Link } from "react-router-dom";

export function ResultCard({ to, faq }: { to: string, faq: { question: string, pageTitle: string } }): JSX.Element {
  return (
    <Link to={to} className="focus:outline-dark focus:drop-shadow-xl">
      <div
        className="bg-primary md:p-5 p-3 mx-2 hover:drop-shadow-xl drop-shadow-md my-2 hover:border-dark/60 border-primary border-2 rounded-sm"
      >
        <h2 className="font-bold">{faq.question}</h2>
        <p className="mt-2 mx-1 px-1 border-l-2">{faq.pageTitle}</p>
      </div>
    </Link>
  );
}