import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input from "../../../components/InputForms";
import { useLogin } from "../hooks/useLogin";
import { loginSchema, type LoginTypes } from "../schemas/loginSchema";
import SubmitFormBtn from "./SubmitFormBtn";

function LoginForm() {
  const { mutate: login, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginTypes>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  async function onSubmit(data: LoginTypes) {
    await login(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        id="email"
        type="email"
        placeholder="you@example.com"
        label="Email"
        register={register("email")}
        error={errors.email?.message}
      />

      <Input
        id="password"
        type="password"
        placeholder="••••••••"
        label="Password"
        register={register("password")}
        error={errors.password?.message}
      />

      <SubmitFormBtn isPending={isPending} message="Login" />
    </form>
  );
}

export default LoginForm;
