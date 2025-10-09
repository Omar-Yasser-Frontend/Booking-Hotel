import { Controller, type Control } from "react-hook-form";
import type { ReservationType } from "../types/reservation";

interface ExtrasFormInputProps {
  extras: { name: string; price: number }[];
  control: Control<ReservationType>;
}

function ExtrasFormInput({ control, extras }: ExtrasFormInputProps) {
  return (
    <Controller
      control={control}
      name="extras"
      defaultValue={[]}
      render={({ field: { value, onChange } }) => (
        <>
          {extras.map((extra) => (
            <div key={extra.name} className="space-x-1">
              <input
                id={`extra-name-${extra.name}`}
                type="checkbox"
                value={extra.name}
                checked={value.includes(extra.name)}
                onChange={(e) =>
                  e.target.checked
                    ? onChange([...value, e.target.value])
                    : onChange(
                        value.filter((extra) => extra !== e.target.value),
                      )
                }
              />
              <label htmlFor={`extra-name-${extra.name}`}>
                {extra.name[0].toUpperCase() + extra.name.slice(1)} (
                {extra.price}$)
              </label>
            </div>
          ))}
        </>
      )}
    />
  );
}

export default ExtrasFormInput;
