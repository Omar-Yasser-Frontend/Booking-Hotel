interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="rounded-md border border-red-300 bg-red-100 p-3 text-center text-red-700">
      {message}
    </div>
  );
}

export default ErrorMessage;
