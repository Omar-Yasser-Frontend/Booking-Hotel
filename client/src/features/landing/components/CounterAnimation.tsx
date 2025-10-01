import { useCounter } from "../hooks/useCounter";

interface CounterAnimationProps {
  targetCount: number;
  durationInMs: number;
}

function CounterAnimation({
  durationInMs,
  targetCount,
}: CounterAnimationProps) {
  const { ref, currentNumber } = useCounter(targetCount, durationInMs);

  return <span ref={ref}>{currentNumber}</span>;
}

export default CounterAnimation;
