function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative container mx-auto h-full px-4 py-20 ${className}`}
    >
      {children}
    </div>
  );
}

export default Container;
