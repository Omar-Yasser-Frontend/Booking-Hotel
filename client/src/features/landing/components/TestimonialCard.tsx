interface TestimonialCard {
  heading: string;
  jobTitle: string;
  feedback: string;
}

function TestimonialCard({ feedback, heading, jobTitle }: TestimonialCard) {
  return (
    <div className="embla__slide bg-white p-5">
      <div className="flex items-center gap-3">
        <img
          className="aspect-square w-12 rounded-full"
          src="/images/default-user.jpg"
          alt=""
        />
        <div>
          <h3 className="font-bold">{heading}</h3>
          <p className="text-xs text-shadow-gray-500">{jobTitle}</p>
        </div>
      </div>
      <hr className="bg-base my-5 h-0.5 w-[40%] border-none" />
      <p>{feedback}</p>
    </div>
  );
}

export default TestimonialCard;
