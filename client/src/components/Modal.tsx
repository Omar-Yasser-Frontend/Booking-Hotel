import { AiOutlineClose } from "react-icons/ai";
import useOutsideClick from "../hooks/useOutsideClick";

interface ModalProps {
  children: React.ReactNode;
  dir?: "center" | "to-right" | "top-center";
  close: () => void;
  className?: string;
}

function Modal({
  children,
  dir = "center",
  className,
  close = () => console.log("closing..."),
}: ModalProps) {
  const ref = useOutsideClick(close);

  return (
    <div
      className={`fixed inset-0 ${className} z-[1000] flex ${
        dir === "center"
          ? "items-center justify-center bg-[#ffffff73]"
          : dir === "top-center"
            ? "items-start justify-center bg-[#ffffff73] pt-10"
            : "items-stretch justify-end bg-[#00000073]"
      }`}
    >
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="relative w-[90vw] max-w-[520px] bg-white"
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
