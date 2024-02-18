import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingModal } from "../components/LoadingModal";
import type { FetchedPage } from "../types/Page";
import axios from 'axios';
import { Button } from "../components/Button";

export function AnswerPage(): JSX.Element {
  const { pageTitle } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [lines, setLines] = useState<FetchedPage["descriptions"]>([]);
  useEffect(() => {
    (async () => {
      axios
        .get<FetchedPage>(`https://faq-odoshari-api.onrender.com/api/pages/${pageTitle}`)
        .then((results) => {
          const resPage = results.data;
          const lines = resPage.descriptions;
          setLines(lines);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    })();
  }, [pageTitle]);

  return (
    <>
      <LoadingModal isOpen={isLoading} />
      <div className="mb-24">
        <h1
          data-test="answer-title"
          className="font-bold text-2xl text-center my-8"
        >
          {pageTitle}
        </h1>
        <div className="my-12 p-4 py-8 bg-white/40 rounded-xl text-lg flex flex-col gap-2">
          {lines.map((line, index) => (
            <div key={index}>
              {line}
            </div>
          ))}
        </div>
      </div>
      <Button theme={"primary"} link={"/"}>検索画面に戻る</Button>
    </>
  );
}
