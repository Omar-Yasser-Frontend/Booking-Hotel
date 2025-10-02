import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input from "../../../components/InputForms";
import { useSignup } from "../hooks/useSignup";
import { signupSchema, type SignupTypes } from "../schemas/signupShema";
import SubmitFormBtn from "./SubmitFormBtn";

function SignupForm() {
  const { mutate: signup, isPending } = useSignup();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SignupTypes>({
    resolver: zodResolver(signupSchema),
    mode: "all",
  });

  async function onSubmit(data: SignupTypes) {
    const { firstName, lastName, email, password } = data;

    await signup({ username: firstName + " " + lastName, email, password });
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="gap-2 sm:flex">
        <Input
          register={register("firstName")}
          error={errors.firstName?.message}
          id="first-name"
          label="First Name"
          placeholder="Your First name"
        />
        <Input
          register={register("lastName")}
          error={errors.lastName?.message}
          id="last-name"
          label="Last Name"
          placeholder="Your last name"
        />
      </div>

      <Input
        register={register("email")}
        error={errors.email?.message}
        id="email"
        label="Email"
        placeholder="example@gmail.com"
      />

      <Input
        register={register("password")}
        error={errors.password?.message}
        type="password"
        id="password"
        label="Password"
        placeholder="••••••••"
      />

      <Input
        register={register("confirmPassword")}
        error={errors.confirmPassword?.message}
        type="password"
        id="confirm-password"
        label="Confirm Password"
        placeholder="••••••••"
      />

      <SubmitFormBtn isPending={isPending} message="Sign up" />
    </form>
  );
}

export default SignupForm;
