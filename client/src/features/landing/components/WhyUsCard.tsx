import { fadeAnimProps } from "../../../utils/animation";
import CounterAnimation from "./CounterAnimation";
import { motion } from "motion/react";

export interface whyUsCardProps {
  heading: string;
  icon: React.ReactElement;
  count: number;
  duration: number;
  className?: string;
}

function WhyUsCard({
  heading,
  icon,
  count,
  duration,
  className = "",
}: whyUsCardProps) {
  return (
    <motion.div
      {...fadeAnimProps}
      transition={{ duration: 0.5 }}
      className={`${className} rounded-xl px-6 py-10`}
    >
      <motion.h3 {...fadeAnimProps} className="flex gap-2 text-xl">
        <span>{heading}</span> {icon}
      </motion.h3>
      <motion.p
        {...fadeAnimProps}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl"
      >
        <CounterAnimation durationInMs={duration} targetCount={count} />+
      </motion.p>
      <motion.p {...fadeAnimProps} transition={{ duration: 0.5, delay: 0.4 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque aut
        aspernatur optio ea pariatur sed tempora quaerat suscipit
      </motion.p>
    </motion.div>
  );
}

export default WhyUsCard;
