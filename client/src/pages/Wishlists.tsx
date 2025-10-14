import Container from "../components/Container";
import WhishlistList from "../features/wishlists/components/WhishlistList";

function Wishlists() {
  return (
    <div>
      <Container>
        <h2 className="text-3xl">Your Wishlists</h2>
        <WhishlistList />
      </Container>
    </div>
  );
}

export default Wishlists;
