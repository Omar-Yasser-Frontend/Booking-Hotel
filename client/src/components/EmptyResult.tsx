import type { ReactNode } from "react";

function EmptyResult({ children }: { children: ReactNode }) {
  return <p className="mt-16 text-center text-lg text-gray-500">{children}</p>;
}

export default EmptyResult;
