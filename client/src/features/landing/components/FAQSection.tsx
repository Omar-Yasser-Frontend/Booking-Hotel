import Container from "../../../components/Container";
import FAQBody from "./FAQBody";
import SectionHeading from "./SectionHeading";

function FAQSection() {
  return (
    <section>
      <Container>
        <SectionHeading
          heading="FAQ"
          paragraph="You would find you answer here"
        />
        <FAQBody />
      </Container>
    </section>
  );
}

export default FAQSection;
