import Container from "../../../components/Container";
import SectionHeading from "./SectionHeading";
import WhyUsBody from "./WhyUsBody";

function WhyUsSection() {
  return (
    <section>
      <Container>
        <SectionHeading
          heading="Why Us"
          paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam error quo doloremque dolores ullam, aliquid rem et facere"
        />
        <WhyUsBody />
      </Container>
    </section>
  );
}

export default WhyUsSection;
