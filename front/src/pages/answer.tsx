import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LoadingModal } from "../components/LoadingModal";
import type { FetchedPage } from "../types/Page";
import axios from 'axios';

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
      <div>
        <h1
          data-test="answer-title"
        >
          {pageTitle}
        </h1>
        <div>
          {lines.map((line, index) => (
            <div key={index}>
              {line}
            </div>
          ))}
        </div>
      </div>
      <div>
        <button>
          <Link to="/">
            &lt; Return to Top Page
          </Link>
        </button>
      </div>
    </>
  );
}
