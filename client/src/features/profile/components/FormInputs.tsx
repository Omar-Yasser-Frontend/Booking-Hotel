import type { Ref } from "react";

function FormInputs(
  props: React.InputHTMLAttributes<HTMLInputElement> & {
    ref?: Ref<null | HTMLInputElement>;
  },
) {
  return (
    <input
      {...props}
      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm transition outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:opacity-70 disabled:shadow-none"
    />
  );
}

export default FormInputs;
