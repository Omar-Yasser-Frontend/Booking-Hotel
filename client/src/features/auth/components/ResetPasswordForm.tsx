import { useForm } from "react-hook-form";
import { useResetPassword } from "../hooks/useResetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitFormBtn from "./SubmitFormBtn";
import Input from "../../../components/InputForms";
import {
  resetPasswordSchema,
  type ResetPasswordTypes,
} from "../schemas/resetPasswordSchema";

function ResetPasswordForm() {
  const { mutate: resetPassword, isPending } = useResetPassword();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ResetPasswordTypes>({
    mode: "all",
    resolver: zodResolver(resetPasswordSchema),
  });

  async function onSubmit(data: ResetPasswordTypes) {
    await resetPassword(data.password);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="password"
        error={errors.password?.message}
        label="Password"
        placeholder="••••••••"
        register={register("password")}
        type="password"
      />
      <Input
        id="confirm-password"
        error={errors.confirmPassword?.message}
        label="Confirm Password"
        placeholder="••••••••"
        register={register("confirmPassword")}
        type="password"
      />

      <SubmitFormBtn isPending={isPending} message="Reset Password" />
    </form>
  );
}

export default ResetPasswordForm;
