import HeroSection from "../features/landing/components/HeroSection";
import TestimonialSection from "../features/landing/components/TestimonialSection";
import WhyUsSection from "../features/landing/components/WhyUsSection";
import FAQSection from "../features/landing/components/FAQSection";
import NewsletterSection from "../features/landing/components/NewsletterSection";

function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyUsSection />
      <TestimonialSection />
      <FAQSection />
      <NewsletterSection />
    </>
  );
}

export default HomePage;
