import Container from "../../../components/Container";
import NewsLetterBody from "./NewsLetterBody";
import SectionHeading from "./SectionHeading";

function JoinNewsletter() {
  return (
    <section className="newsletter bg-cover">
      <Container>
        <SectionHeading
          heading="Join Newsletter"
          paragraph="We send latest news about our services"
        />

        <NewsLetterBody />
      </Container>
    </section>
  );
}

export default JoinNewsletter;
