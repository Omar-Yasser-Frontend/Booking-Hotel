import { FaGift } from "react-icons/fa6";
import Container from "../components/Container";
import { useReceipte } from "../hooks/useReceipte";
import MainLoading from "../components/MainLoading";
import PrimaryBtn from "../components/PrimaryBtn";

function ThanksPage() {
  const { data, isPending, isError, error } = useReceipte();

  if (isPending) return <MainLoading />;

  if (isError) throw new Error(error.message);

  return (
    <Container>
      <div className="mx-auto w-xl max-w-full rounded-xl border-1 border-gray-300 p-4">
        <FaGift size={60} className="mx-auto text-center" />
        <div className="text-center">
          <h2 className="text-3xl font-bold">Thanks for reservation</h2>
          <p>Thanks for being part of our hotel and thanks for payment</p>
          <p className="text-red-500">
            <b>Note:</b> this is just portfolio website no service or rooms are
            provided
          </p>
        </div>

        <div className="m-3 space-y-3 rounded-lg border p-2">
          <div className="grid grid-cols-2 gap-x-2 gap-y-3">
            <p>Check-in: {new Date(data.receipte.checkIn).toUTCString()}</p>
            <p>Check-out: {new Date(data.receipte.checkOut).toUTCString()}</p>
            <p>Nights: {data.receipte.nightsCount}</p>
          </div>
          <p>Price: ${data.receipte.totalPrice}</p>

          <p>
            You can say more details about payment{" "}
            <a className="text-blue-700" href={data.receipte.url}>
              here
            </a>
          </p>
        </div>
        <PrimaryBtn
          className="mt-4 block w-full text-center"
          to="/profile/history"
        >
          More Details
        </PrimaryBtn>
      </div>
    </Container>
  );
}

export default ThanksPage;
