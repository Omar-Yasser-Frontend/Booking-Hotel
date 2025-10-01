interface LoadingProps {
  className?: string;
}

function Loading({ className = "" }: LoadingProps) {
  return (
    <div
      className={`loading flex items-center justify-center gap-5 ${className}`}
    >
      <span className="bg-base aspect-square w-5 rounded-full"></span>
      <span className="bg-base aspect-square w-5 rounded-full"></span>
      <span className="bg-base aspect-square w-5 rounded-full"></span>
    </div>
  );
}

export default Loading;
