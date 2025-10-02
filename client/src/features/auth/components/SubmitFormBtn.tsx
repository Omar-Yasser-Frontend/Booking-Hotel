import ButtonLoading from "../../../components/ButtonLoading";
import PrimaryBtn from "../../../components/PrimaryBtn";

interface SubmitFormBtnProps {
  isPending: boolean;
  message: string;
}

function SubmitFormBtn({ isPending, message }: SubmitFormBtnProps) {
  return (
    <PrimaryBtn
      disabled={isPending}
      className={`mt-2 w-full text-center ${isPending ? "cursor-not-allowed" : ""}`}
    >
      {isPending ? <ButtonLoading /> : message}
    </PrimaryBtn>
  );
}

export default SubmitFormBtn;
