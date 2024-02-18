import { useEffect, useState } from "react";
import body from "@/assets/body.svg";
import hand from "@/assets/hand.svg";
import { ResultCard } from "../components/ResultCard";
import { LoadingModal } from "../components/LoadingModal";
import { Button } from "../components/Button";
import type { FAQ, FetchedFAQs } from "../types/FAQ";
import axios from 'axios';

export function TopPage(): JSX.Element {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [defaultFaqs, setDefaultFaqs] = useState<FAQ[]>([]);
  const similarWord: string | null = null;

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
        <div className="mx-[5vw] w-1/5 relative">
          <img width="100%" src={body} alt="ninzya_body" />
          <div className="w-full z-10 absolute top-0">
            <img width="100%" src={hand} alt="ninzya_hand" />
          </div>
        </div>
        <div>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="検索"
            data-test="search-input"
            className="w-full p-4 px-6 border-dark/80 border-4 drop-shadow-lg rounded-xl focus:outline-0 focus:border-dark focus:drop-shadow-xl"
          />
        </div>
      </div>
      <div className="mt-6">
        {input === "" ? (
          <>
            <span>よくある質問</span>
            <ul>
              {defaultFaqs.map((faq, index) => (
                <li
                  key={index}
                >
                  <ResultCard
                    to={`/pages/${faq.pageTitle}`}
                    faq={faq}
                  />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            {
              similarWord ? <span>類義語「<button onClick={() => setInput(similarWord)}>{similarWord}</button>」で検索しています</span>
                : faqs.length !== 0 ? <span>{faqs.length}件の検索結果が見つかりました</span>
                  : <span>類義語が見つかりませんでした</span>
            }

            <ul>
              {faqs.map(faq => (
                <ResultCard
                  key={faq.question}
                  to={`/pages/${faq.pageTitle}`}
                  faq={faq}
                />
              ))}
              {faqs.length === 0 && (
                <Button theme={"primary"}>生成系AIの解答を見る</Button>
              )}
            </ul>
          </>
        )}
      </div >
    </>
  );
}
