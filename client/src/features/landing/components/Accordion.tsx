import type React from "react";
import AccordionIcon from "./AccordionIcon";

interface AccordionProps {
  question: string;
  answer: string;
  idx: number;
  setAnswer: React.Dispatch<number | null>;
  answerId: number | null;
}

function Accordion({
  question,
  answer,
  idx,
  setAnswer,
  answerId,
}: AccordionProps) {
  return (
    <div
      className="w-full cursor-pointer"
      onClick={() => {
        if (answerId === idx) return setAnswer(null);

        setAnswer(idx);
      }}
    >
      <h3 className="border-base flex items-center justify-between border-b-1 px-6 py-3 text-xl select-none">
        <span>{question}</span>
        <AccordionIcon isActive={answerId === idx} />
      </h3>
      <p
        className={`border-base overflow-hidden border-b-1 px-6 duration-300 ${
          answerId === idx ? "max-h-100 py-3" : "max-h-0 py-0"
        }`}
      >
        {answer}
      </p>
    </div>
  );
}

export default Accordion;
