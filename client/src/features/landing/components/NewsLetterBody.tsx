import { useState, type ChangeEvent } from "react";
import PrimaryBtn from "../../../components/PrimaryBtn";
import { motion } from "motion/react";
import { fadeAnimProps } from "../../../utils/animation";

function NewsLetterBody() {
  const [email, setEmail] = useState("");

  return (
    <motion.div {...fadeAnimProps} className="text-center">
      <motion.h3 {...fadeAnimProps} className="text-bold mb-8 text-2xl">
        Join Our newsLetter to get the latest news
      </motion.h3>
      <motion.div
        {...fadeAnimProps}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-auto flex w-80 max-w-full flex-col gap-y-4"
      >
        <input
          type="text"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          className="focus:border-base border-2 border-transparent bg-white px-6 py-3 duration-100 outline-none"
          placeholder="example@email.com"
        />
        <PrimaryBtn className={!email ? "pointer-events-none opacity-0" : ""}>
          Join Us
        </PrimaryBtn>
      </motion.div>
    </motion.div>
  );
}

export default NewsLetterBody;
