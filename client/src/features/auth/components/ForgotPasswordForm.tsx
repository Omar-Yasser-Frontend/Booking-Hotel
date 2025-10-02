import { useForm } from "react-hook-form";
import Input from "../../../components/InputForms";
import SubmitFormBtn from "./SubmitFormBtn";
import {
  forgotPswrdShema,
  type forgotPswrdTypes,
} from "../schemas/forgotPasswordShema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForogotPassword } from "../hooks/useForogotPassword";

function ForgotPasswordForm() {
  const { mutate: forgotPassword, isPending } = useForogotPassword();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<forgotPswrdTypes>({
    mode: "all",
    resolver: zodResolver(forgotPswrdShema),
  });

  async function onSubmit(data: forgotPswrdTypes) {
    await forgotPassword(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="email"
        type="email"
        error={errors.email?.message}
        label="email"
        placeholder="example@gmail.com"
        register={register("email")}
      />

      <SubmitFormBtn isPending={isPending} message="Send Email" />
    </form>
  );
}

export default ForgotPasswordForm;
