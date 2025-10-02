import { Link } from "react-router";

interface PrimaryBtnProps {
  children: React.ReactNode;
  className?: string;
  to?: string | undefined;
  disabled?: boolean;
}

function PrimaryBtn({
  children,
  className = "",
  to,
  disabled = false  ,
}: PrimaryBtnProps) {
  const Component = to ? Link : "button";

  return (
    <Component
      to={to as string}
      disabled={disabled}
      className={`bg-base border-base cursor-pointer border-3 px-6 py-3 text-white ${className} duration-300 hover:bg-white hover:text-black`}
    >
      {children}
    </Component>
  );
}

export default PrimaryBtn;
