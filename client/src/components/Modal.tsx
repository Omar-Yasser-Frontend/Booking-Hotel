import { AiOutlineClose } from "react-icons/ai";
import useOutsideClick from "../hooks/useOutsideClick";

interface ModalProps {
  children: React.ReactNode;
  dir?: "center" | "to-right";
  close: () => void;
}

function Modal({
  children,
  dir = "center",
  close = () => console.log("closing..."),
}: ModalProps) {
  const ref = useOutsideClick(close);

  return (
    <div
      className={`fixed inset-0 z-[1000] flex lg:hidden ${
        dir === "center"
          ? "items-center justify-center bg-[#ffffff73]"
          : "items-stretch justify-end bg-[#00000073]"
      }`}
    >
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="relative min-w-[250px] bg-white"
      >
        {children}
      </div>
    </div>
  );
}

Modal.Close = function Close({
  close,
  absolute,
  className,
}: {
  close: () => void;
  absolute?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex ${className} ${
        absolute ? "absolute top-0 right-0" : ""
      }`}
    >
      <button
        onClick={() => close()}
        className={`border-burgundy text-burgundy ml-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 bg-white ${
          absolute ? "" : ""
        }`}
      >
        <AiOutlineClose />
      </button>
    </div>
  );
};

export default Modal;
