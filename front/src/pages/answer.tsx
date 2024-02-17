import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

type Page = {
  lines: Array<{id: string; text: string}>;
};

export function AnswerPage(): JSX.Element {
  const {pageTitle} = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [lines, setLines] = useState<Array<{id: string; text: string}>>([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/pages/${pageTitle}`);
      const page = (await res.json()) as Page;
      const lines = page.lines
        // exclude the first line because it's the page title.
        .slice(1)
        // exclude lines that start with "? " because they are texts for questions.
        .filter(line => !line.text.startsWith("? "));
      setLines(lines);
      setIsLoading(false);
    })();
  }, [pageTitle]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>
        <h1
          data-test="answer-title"
        >
          {pageTitle}
        </h1>
        <div>
          {lines.map(line => (
            <div key={line.id}>
              {line.text}
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
