const ReservationService = require("../services/reservationService");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.WEBHOOK_SECRET_ENDPOINT;
const reservationService = new ReservationService();

async function handlePaymentIntentSucceeded(paymentIntent) {
  const idempotencyKey = `refund_${paymentIntent.id}`;

  try {
    const metadata = {
      ...paymentIntent.metadata,
      extras: JSON.parse(paymentIntent.metadata.extras),
      intentId: paymentIntent.id,
    };

    const reservation = await reservationService.createReservation(metadata);

    console.log("✅ Reservation created successfully:", reservation);
  } catch (err) {
    console.error("❌ Error creating reservation:", err.message);

    try {
      await stripe.refunds.create(
        {
          payment_intent: paymentIntent.id,
        },
        {
          idempotencyKey,
        }
      );
      console.log(
        "💸 Refund processed successfully for payment intent:",
        paymentIntent.id
      );
    } catch (refundErr) {
      console.error("❌ Refund failed:", refundErr.message);
    }
  }
}

exports.webhookHandler = async (request, response) => {
  const sig = request.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.error(`⚠️ Webhook signature verification failed: ${err.message}`);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      paymentIntent.metadata = {
        roomId: "68c9d7941916248385847bf9",
        checkIn: "2025-09-15T00:00:00Z",
        checkOut: "2025-09-20T00:00:00Z",
        extras:
          '[{"name":"Camel Tours","price":30},{"name":"Traditional Breakfast","price":20}]',
        userId: "68c74fda1348a6e980d9e768",
        totalPrice: 750,
        nightsCount: 5,
      };
      console.log("🔄 Handling payment_intent.succeeded:", paymentIntent.id);
      await handlePaymentIntentSucceeded(paymentIntent);
      break;

    case "payment_intent.payment_failed":
      console.log(
        "❌ Payment failed, no reservation needed:",
        event.data.object.id
      );
      break;

    default:
    // console.log(`📝 Unhandled event type: ${event.type}`);
  }

  response.json({ received: true });
};
