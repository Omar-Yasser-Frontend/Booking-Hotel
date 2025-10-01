function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative container mx-auto h-full px-4 py-20">
      {children}
    </div>
  );
}

export default Container;
