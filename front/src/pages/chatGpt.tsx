import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingModal } from "../components/LoadingModal";
import type { FetchedPage } from "../types/Page";
import axios from 'axios';
import { Button } from "../components/Button";

export function ChatGptPage(): JSX.Element {
  const { searchQuery } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState<FetchedPage>({ page_title: '', descriptions: [''] });
  useEffect(() => {
    (async () => {
      axios
        .get<FetchedPage>(`https://faq-odoshari-api.onrender.com/api/gpt4/${searchQuery}`)
        .then((results) => {
          const resPage = results.data;
          setPage(resPage);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    })();
  }, [searchQuery]);

  return (
    <>
      <LoadingModal isOpen={isLoading} />
      <div className="mb-24">
        <h1
          data-test="answer-title"
          className="font-bold text-2xl text-center my-8"
        >
          {page.page_title}
        </h1>
        <div className="my-12 p-4 py-8 bg-white/40 rounded-xl text-lg flex flex-col gap-2">
          {page.descriptions.map((line, index) => (
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
