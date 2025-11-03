function MainLoading() {
  return (
    <div className="loading absolute inset-0 z-50 flex h-screen items-center justify-center gap-5 bg-white">
      <span className="bg-base aspect-square w-5 rounded-full"></span>
      <span className="bg-base aspect-square w-5 rounded-full"></span>
      <span className="bg-base aspect-square w-5 rounded-full"></span>
    </div>
  );
}

export default MainLoading;
