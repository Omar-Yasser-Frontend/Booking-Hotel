import { Link } from "react-router";
import ButtonLoading from "./ButtonLoading";

interface PrimaryBtnProps {
  children: React.ReactNode;
  className?: string;
  to?: string | undefined;
  disabled?: boolean;
  onClick?: () => void;
  isPending?: boolean;
}

function PrimaryBtn({
  children,
  className = "",
  to,
  disabled = false,
  isPending = false,
  onClick,
}: PrimaryBtnProps) {
  const Component = to ? Link : "button";

  return (
    <Component
      to={to as string}
      onClick={() => onClick && onClick()}
      disabled={disabled || isPending}
      className={`bg-base border-base cursor-pointer border-3 px-6 py-3 text-white ${className} duration-300 hover:bg-white hover:text-black`}
    >
      {isPending ? <ButtonLoading /> : children}
    </Component>
  );
}

export default PrimaryBtn;
