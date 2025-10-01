import { motion } from "motion/react";
import TestimonialSliders from "./TestimonialSliders";

function TestimonialBody() {
  return (
    <div className="flex flex-col items-center justify-between gap-x-40 gap-y-10 lg:flex-row">
      <div className="mt-22 aspect-square w-[375px] max-w-[70vw] lg:w-[450px] lg:max-w-[70%]">
        <motion.div className="w-full origin-top-left -rotate-[25deg] bg-white p-3">
          <motion.img
            initial={{ rotate: 50 }}
            whileInView={{ rotate: 0 }}
            transition={{ type: "spring", duration: 1, delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="aspect-square w-full origin-top-left bg-cover shadow-2xl"
            src="/images/bady-abbas-hxi_yRxODNc-unsplash.jpg"
            alt=""
          />
        </motion.div>
      </div>

      <TestimonialSliders />
    </div>
  );
}

export default TestimonialBody;
