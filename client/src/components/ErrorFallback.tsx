type ErrorFallbackProps = { error: Error; resetErrorBoundary: () => void };

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  return (
    <div className="flex h-screen flex-col justify-center bg-red-100 p-4 text-center text-red-700">
      <h2 className="mb-2 text-lg font-semibold">Something went wrong 😢</h2>
      <p>{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-3 rounded-md bg-red-600 px-4 py-2 text-white"
      >
        Try again
      </button>
    </div>
  );
}
