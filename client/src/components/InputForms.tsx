import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  id: string;
  type?: "password" | "text" | "email";
  placeholder: string;
  label: string;
  register: UseFormRegisterReturn;
  error: string | undefined;
}

function InputForm({
  id,
  type = "text",
  placeholder,
  label,
  register,
  error,
}: InputProps) {
  return (
    <div className="mb-2 space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm transition outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
        {...register}
      />
      {error && <p className="text-sm text-red-700">{error}</p>}
    </div>
  );
}

export default InputForm;
