type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function Input(props: InputProps) {
  return (
    <div className="mb-2 space-y-2">
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-slate-700"
      >
        {props.label}
      </label>
      <input
        {...props}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm transition outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
      />
    </div>
  );
}

export default Input;
