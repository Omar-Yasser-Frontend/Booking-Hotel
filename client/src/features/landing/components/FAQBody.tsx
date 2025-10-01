import { useState } from "react";
import Accordion from "./Accordion";

const AccordionDataList = [
  {
    question: "Where is Hotel Booking",
    answer:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic deleniti, iure vel consectetur adipisci exercitationem",
  },
  {
    question: "Is their is parking in hotel",
    answer:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic deleniti, iure vel consectetur adipisci exercitationem",
  },
  {
    question: "Do we have pool",
    answer:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic deleniti, iure vel consectetur adipisci exercitationem",
  },
  {
    question: "Can i use Local Payment methods",
    answer:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic deleniti, iure vel consectetur adipisci exercitationem",
  },
  {
    question: "Can I pay the reservation price in installments?",
    answer:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic deleniti, iure vel consectetur adipisci exercitationem",
  },
];

function FAQBody() {
  const [accordionIdx, setAccordionIdx] = useState<number | null>(null);

  return (
    <div className="mx-auto flex w-[500px] max-w-full flex-col">
      {AccordionDataList.map((data, idx) => (
        <Accordion
          {...data}
          idx={idx}
          answerId={accordionIdx}
          setAnswer={setAccordionIdx}
          key={idx}
        />
      ))}
    </div>
  );
}

export default FAQBody;
