import { useForm } from "react-hook-form";
import InputForm from "../../../components/InputForms";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  type ChangePasswordType,
} from "../types/changePassword";
import PrimaryBtn from "../../../components/PrimaryBtn";
import { useChangePassword } from "../hooks/useChangePassword";

function ChangePasswordForm() {
  const { mutate: changePassword } = useChangePassword();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ChangePasswordType>({
    mode: "all",
    resolver: zodResolver(changePasswordSchema),
  });
  return (
    <div className="p-4">
      <h2 className="mb-8 text-2xl font-bold">Change Password</h2>
      <form
        onSubmit={handleSubmit((data) => {
          const { currentPassword, newPassword } = data;

          changePassword(
            { currentPassword, newPassword },
            { onSuccess: () => reset() },
          );
        })}
        className="mx-auto w-[500px] max-w-full items-center justify-center"
      >
        <InputForm
          register={register("currentPassword")}
          error={errors.currentPassword?.message}
          id="current-password"
          label="Current Password"
          placeholder="••••••••"
          type="password"
        />
        <InputForm
          register={register("newPassword")}
          error={errors.newPassword?.message}
          id="new-password"
          label="New Password"
          placeholder="••••••••"
          type="password"
        />
        <InputForm
          register={register("confirmPassword")}
          error={errors.confirmPassword?.message}
          id="confirm-password"
          label="Confirm Password"
          placeholder="••••••••"
          type="password"
        />
        <PrimaryBtn className="mt-5 w-full">Change Password</PrimaryBtn>
      </form>
    </div>
  );
}

export default ChangePasswordForm;
