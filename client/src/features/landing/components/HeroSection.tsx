import Container from "../../../components/Container";
import PrimaryBtn from "../../../components/PrimaryBtn";
import { motion } from "motion/react";
import { fadeAnimProps } from "../../../utils/animation";

function HeroSection() {
  return (
    <section className="hero-section h-[calc(100vh-84px)]">
      <Container>
        <motion.div
          {...fadeAnimProps}
          className="relative mx-auto flex h-full w-full max-w-96 flex-col items-center justify-center gap-y-8 text-center sm:mx-0 sm:max-w-xl md:items-start md:text-start"
        >
          <h1 className="border-base w-fit border-b-3 px-2 pb-2 text-4xl font-bold sm:text-5xl">
            Welcome Hotel Booking
          </h1>
          <p className="text-sm font-medium text-gray-700 sm:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            repellat numquam corrupti porro omnis quaerat voluptatem harum a
            consequatur totam vero itaque.
          </p>
          <div className="flex gap-3">
            <PrimaryBtn to="/rooms">Get Started</PrimaryBtn>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default HeroSection;
