import type { FieldErrors, UseFormRegister } from "react-hook-form";
import InputForm from "../../../components/InputForms";
import type { ReservationType } from "../types/reservation";
import { preventStringsInInputs } from "../utils/preventStringsInInputs";

interface FormTextInputsProps {
  errors: FieldErrors<ReservationType>;
  register: UseFormRegister<ReservationType>;
}

function FormTextInputs({ errors, register }: FormTextInputsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <InputForm
          error={errors?.guests?.message}
          register={register("guests")}
          id="guests"
          onKeyDown={preventStringsInInputs}
          label="Guests"
          placeholder="1"
        />

        <InputForm
          error={errors?.room?.message}
          register={register("room")}
          id="rooms"
          onKeyDown={preventStringsInInputs}
          label="Rooms"
          placeholder="2"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm opacity-80" htmlFor="notes">
          Notes
        </label>
        <textarea
          id="notes"
          rows={4}
          {...register("notes")}
          className="w-full resize-none rounded-md bg-white px-3 py-2 focus:outline-none"
          placeholder="Any special requests"
        />
        {errors.notes?.message && (
          <p className="text-sm text-red-700">{errors.notes?.message}</p>
        )}
      </div>
    </>
  );
}

export default FormTextInputs;
