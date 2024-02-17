import { useEffect, useState } from "react";
import body from "@/assets/body.svg";
import hand from "@/assets/hand.svg";
import { ResultCard } from "../components/ResultCard";
import { LoadingModal } from "../components/LoadingModal";
import { Button } from "../components/Button";

type FAQ = {
  question: string;
  pageTitle: string;
};

export function TopPage(): JSX.Element {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [defaultFaqs, setDefaultFaqs] = useState<FAQ[]>([]);
  const similarWord: string | null = null;

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
            className="w-full p-2 px-4 border-dark border-2 drop-shadow-lg rounded-xl"
          />
        </div>
      </div>
      <div className="mt-6">
        {input === "" ? (
          <>
            <span>よくある質問</span>
            <ul>
              {defaultFaqs.map(faq => (
                <ResultCard
                  key={faq.question}
                  to={`/pages/${faq.pageTitle}`}
                  faq={faq}
                />
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
