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
  const intervalRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (emblaApi) emblaApi.scrollPrev();
    }, 7000);
    return () =>
      clearInterval(
        intervalRef.current as unknown as ReturnType<typeof setTimeout>,
      );
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    clearInterval(
      intervalRef.current as unknown as ReturnType<typeof setTimeout>,
    );
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    clearInterval(
      intervalRef.current as unknown as ReturnType<typeof setTimeout>,
    );
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="flex flex-grow justify-end gap-2 p-4">
      <div className="embla h-[300px] w-[450px] max-w-[80vw] shadow-2xl">
        <div className="embla__viewport h-full overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex h-full flex-col">
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
