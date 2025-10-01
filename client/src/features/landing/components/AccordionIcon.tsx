interface AccordionIconProps {
  isActive: boolean;
}

function AccordionIcon({ isActive }: AccordionIconProps) {
  return (
    <div className="border-base relative aspect-square w-5 rounded-full border-2">
      <div
        className={`bg-base absolute top-1/2 left-1/2 h-0.5 w-[80%] -translate-1/2 duration-300 ${
          isActive ? "rotate-90" : ""
        }`}
      ></div>
      <div className="bg-base absolute top-1/2 left-1/2 h-0.5 w-[80%] -translate-1/2"></div>
      <div></div>
    </div>
  );
}

export default AccordionIcon;
