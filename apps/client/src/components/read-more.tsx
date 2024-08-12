// Initial code taken from https://medium.com/@filipepfluckdev/creating-a-read-more-component-in-react-4afd1d17d40b

import { useState } from "react";

export function ReadMore({
  id,
  children,
  amountOfWords = 30,
}: {
  id: string;
  children: string;
  amountOfWords?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const splitText = children.split(" ");
  const itCanOverflow = splitText.length > amountOfWords;
  const beginText = itCanOverflow
    ? splitText.slice(0, amountOfWords - 1).join(" ")
    : children;

  const handleKeyboard = (e: React.KeyboardEvent) => {
    if (e.code === "Space" || e.code === "Enter") {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <p id={id} className="grow basis-full whitespace-pre-wrap">
      {isExpanded ? children : beginText}
      {itCanOverflow && !isExpanded && "..."}

      {itCanOverflow && (
        <span>
          {" "}
          <button
            className="text-violet-400 opacity-90 underline"
            type="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            aria-controls={id}
            onKeyDown={handleKeyboard}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "show less" : "show more"}
          </button>
        </span>
      )}
    </p>
  );
}
