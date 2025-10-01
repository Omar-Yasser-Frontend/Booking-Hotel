import { useEffect, useRef, useCallback } from "react";

function useOutsideClick(close: () => void, isActive: boolean = true) {
  const ref = useRef<HTMLElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    if (!isActive) return;

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside, isActive]);

  return ref;
}

export default useOutsideClick;
