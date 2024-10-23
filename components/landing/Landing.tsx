import Section from "@/components/Section";
import Hero from "@/components/heros/HeroVision";
import How from "@/components/how/How-1";
import Features from "@/components/features/Features-2";

import Pricing from "@/components/pricing/Pricing-1";
import CTA from "@/components/ctas/CTA-1";

import FAQ from "@/components/faqs/FAQ-1";
import Testimonials from "@/components/testimonials/Testimonials-1";

import { appConfig } from "@/config";

export default function Page() {
  return (
    <>
      <div data-theme={appConfig.company.theme}>
        <Hero />
        <Section>
          <How />
          <Features />
          <Testimonials />
        </Section>
        <Pricing />
        <CTA />
        <FAQ />
      </div>
    </>
  );
}
