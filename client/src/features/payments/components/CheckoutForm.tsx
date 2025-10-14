import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import PrimaryBtn from "../../../components/PrimaryBtn";
import Container from "../../../components/Container";
import CheckoutSummery from "./CheckoutSummery";

export interface Extra {
  name: string;
  price: number;
}

// Raw data as it comes from the server
export interface RawBookingData {
  checkIn: string;
  checkOut: string;
  roomId: string;
  _id: string;
  userId: string;
  extras: string; // Stringified JSON from server
  nightsCount: number;
  totalPrice: number;
  guests: number;
  room: number;
  notes: string;
}

// Processed data after parsing
export interface ProcessedBookingData extends Omit<RawBookingData, "extras"> {
  extras: Extra[];
}

function CheckoutForm() {
  const { bookingData: rawBookingData }: { bookingData: RawBookingData } =
    JSON.parse(sessionStorage.getItem("clientSecret") as string);

  // Transform the raw data into processed data
  const bookingData: ProcessedBookingData = {
    ...rawBookingData,
    extras: rawBookingData.extras ? JSON.parse(rawBookingData.extras) : [],
  };

  const stripe = useStripe();
  const elements = useElements();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!stripe || !elements) return;

    await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order/123/complete`,
      },
    });
  }

  return (
    <Container>
      <form onSubmit={handleSubmit} className="mx-auto w-xl max-w-full">
        <h2 className="mb-8 text-3xl font-bold">Checkout</h2>
        <PaymentElement />
        <CheckoutSummery bookingData={bookingData} />
        <PrimaryBtn className="mt-8 block w-full">Confirm Payment</PrimaryBtn>
      </form>
    </Container>
  );
}

export default CheckoutForm;
