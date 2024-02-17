import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import wanko from "@/assets/wanko.svg";
import { Button } from "../components/Button";
import { ResultCard } from "../components/ResultCard";

type FAQ = {
  question: string;
  pageTitle: string;
};

export function TopPage(): JSX.Element {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [defaultFaqs, setDefaultFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/faqs");
      const faqs = await res.json();
      localStorage.setItem("faqs", JSON.stringify(faqs));
      setDefaultFaqs(faqs.slice(0, 5));
      setIsLoading(false);
    })();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setFaqs([]);
      return;
    }

    const faqs = JSON.parse(localStorage.getItem("faqs")!);
    const filteredFaqs = faqs.filter((faq: FAQ) =>
      faq.question.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setFaqs(filteredFaqs);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>
        <div className="pl-4">
          <img src={wanko} alt="wanko" />
        </div>
        <div>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Enter the keyword"
            data-test="search-input"
            className="w-full p-2"
          />
        </div>
      </div>
      <div className="mt-4">
        <Button theme="primary">Button</Button>
      </div>
      <div>
        {input === "" ? (
          <>
            <span>
              Frequently Asked Questions
            </span>
            <ul>
              {defaultFaqs.map(faq => (
                <ResultCard
                  key={faq.question}
                  to={`/pages/${faq.pageTitle}`}
                  question={faq.question}
                />
              ))}
            </ul>
          </>
        ) : (
          <>
            <span>{`${faqs.length} questions matched`}</span>
            <ul>
              {faqs.map(faq => (
                <li
                  key={faq.question}
                >
                  <Link
                    to={`/pages/${faq.pageTitle}`}
                    data-test="question-title"
                  >
                    {faq.question}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
