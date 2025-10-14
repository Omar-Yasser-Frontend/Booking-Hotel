import { Link } from "react-router";

function Disclamer() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <section className="rounded-lg border border-gray-200 bg-white p-8">
        <h1 className="mb-4 text-2xl font-semibold text-black">
          Important — Demo / Portfolio Notice
        </h1>

        <p className="mb-4 text-[16px] text-black">
          This website is a portfolio/demo project and does not provide real
          booking or payment services. Any interaction here is for demonstration
          purposes only.
        </p>

        <p className="mb-4 text-sm text-gray-600">
          Do not enter real payment details, and do not send money or sensitive
          personal information through this site. No bookings made here are real
          — they are simulated for development and testing.
        </p>

        <p className="mb-6 text-sm text-gray-600">
          If you arrived here by mistake, please return to the homepage. If you
          are testing features, feel free to use test credentials and the test
          payment flows provided by Stripe in test mode.
        </p>

        <div>
          <Link
            to="/"
            className="inline-block rounded-md border border-black px-4 py-2 text-sm font-medium text-black hover:bg-black hover:text-white"
          >
            Go home
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Disclamer;
