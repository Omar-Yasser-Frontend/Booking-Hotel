import { useState, useEffect, useRef } from "react";

// You can make this a custom hook for reusability
export function useCounter(targetNumber: number, durationInMs: number) {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [start, setStart] = useState(false);
  const animationFrameIdRef = useRef<number | null>(null); // Use useRef to persist the ID
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStart(true);
            observer.unobserve(entry.target); // عشان يشتغل مرة واحدة بس
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  useEffect(() => {
    if (!start) return;
    let startTime: number;

    const animateCount = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = timestamp - startTime;
      const percentage = Math.min(progress / durationInMs, 1);
      const nextNumber = Math.floor(percentage * targetNumber);
      setCurrentNumber(nextNumber);

      if (percentage < 1) {
        animationFrameIdRef.current = requestAnimationFrame(animateCount);
      }
    };

    animationFrameIdRef.current = requestAnimationFrame(animateCount);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [targetNumber, durationInMs, start]);

  return { ref, currentNumber };
}
