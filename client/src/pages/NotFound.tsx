import PrimaryBtn from "../components/PrimaryBtn";

function NotFound() {
  return (
    <div className="container mx-auto py-20 text-center">
      <h2 className="mb-10 text-5xl">Page Not Found 404</h2>
      <PrimaryBtn to="/">Go Home</PrimaryBtn>
    </div>
  );
}

export default NotFound;
