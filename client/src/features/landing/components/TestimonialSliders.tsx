import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef } from "react";
import TestiMonialCard from "./TestimonialCard";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const testimonialsList = [
  {
    heading: "John Doe",
    feedback:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet eum vero delectus ipsa repudiandae, facere, sit accusantium vel consequatur",
    jobTitle: "CEO | CTO",
  },
  {
    heading: "John Doe",
    feedback:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet eum vero delectus ipsa repudiandae, facere,  accusantium vel consequatur possimus neque aliquid voluptates impedit iste ab? Totam maiores blanditiis tenetur!",
    jobTitle: "VIP | MVP",
  },
  {
    heading: "John Doe",
    feedback:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet eum vero delectus ipsa repudiandae, facere,  accusantium vel consequatur possimus neque aliquid voluptates impedit iste ab?",
    jobTitle: "minecraft noob",
  },
];

function TestimonialSliders() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "y",
    loop: true,
    watchDrag: false,
  });
  const intervalRef = useRef<null | NodeJS.Timeout>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (emblaApi) emblaApi.scrollPrev();
    }, 7000);
    return () =>
      clearInterval(intervalRef.current as unknown as NodeJS.Timeout);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    clearInterval(intervalRef.current as unknown as NodeJS.Timeout);
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    clearInterval(intervalRef.current as unknown as NodeJS.Timeout);
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="flex flex-grow justify-end gap-2 p-4">
      <div className="embla shadow-2xl">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {testimonialsList.map((data, idx) => (
              <TestiMonialCard key={idx} {...data} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <button className="embla__prev flex flex-col" onClick={scrollPrev}>
          <IoIosArrowUp size={26} className="cursor-pointer text-white" />
        </button>
        <button className="embla__next" onClick={scrollNext}>
          <IoIosArrowDown size={26} className="cursor-pointer text-white" />
        </button>
      </div>
    </div>
  );
}

export default TestimonialSliders;
