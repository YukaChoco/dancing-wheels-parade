import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import wanko from "@/assets/wanko.svg";
import { Button } from "../components/Button";
import { ResultCard } from "../components/ResultCard";
import { LoadingModal } from "../components/LoadingModal";
import type { FAQ, FetchedFAQs } from "../types/FAQ";
import axios from 'axios';

export function TopPage(): JSX.Element {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [defaultFaqs, setDefaultFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    (async () => {
      axios
        .get<FetchedFAQs[]>("https://faq-odoshari-api.onrender.com/api/faqs")
        .then((results) => {
          const resFaqs = results.data;
          const faqs = resFaqs.flatMap((faq) => (
            faq.questions.map((question) => ({
              question: question,
              pageTitle: faq.page_title,
            }))
          ))
          localStorage.setItem("faqs", JSON.stringify(faqs));
          setDefaultFaqs(faqs.slice(0, 5));
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
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

  return (
    <>
      <LoadingModal isOpen={isLoading} />
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
              {defaultFaqs.map((faq, index) => (
                <li
                  key={index}
                >
                  <ResultCard
                    to={`/pages/${faq.pageTitle}`}
                    question={faq.question}
                  />
                </li>
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
