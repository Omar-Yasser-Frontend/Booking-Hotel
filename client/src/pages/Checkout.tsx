import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../features/payments/components/CheckoutForm";
import { Navigate } from "react-router";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

function Checkout() {
  const booking = sessionStorage.getItem("clientSecret");

  if (!booking) return <Navigate replace to={"/rooms"} />;
  const bookingData: { client_secret: string } = JSON.parse(booking);

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: bookingData.client_secret }}
    >
      <CheckoutForm />
    </Elements>
  );
}

export default Checkout;
