import Container from "../../../components/Container";
import SectionHeading from "./SectionHeading";
import TestimonialBody from "./TestimonialBody";

function TestimonialSection() {
  return (
    <section className="section-bg overflow-hidden">
      <Container>
        <SectionHeading
          heading="Testimonials"
          paragraph="Some users feedback about our services"
        />
        <TestimonialBody />
      </Container>
    </section>
  );
}

export default TestimonialSection;
