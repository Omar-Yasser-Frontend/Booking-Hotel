import { motion } from "motion/react";
import { fadeAnimProps } from "../../../utils/animation";

interface SectionHeadingProps {
  heading: string;
  paragraph: string;
}

function SectionHeading({ heading, paragraph }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-16 flex max-w-96 flex-col gap-8 text-center sm:max-w-xl">
      <motion.h2
        {...fadeAnimProps}
        className="section-heading relative text-3xl font-bold md:text-4xl"
      >
        {heading}
        <span></span>
      </motion.h2>
      <motion.p
        {...fadeAnimProps}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-gray-700"
      >
        {paragraph}
      </motion.p>
    </div>
  );
}

export default SectionHeading;
