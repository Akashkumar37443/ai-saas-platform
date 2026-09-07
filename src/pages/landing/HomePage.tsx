import { Hero } from '@/components/landing/Hero';
import { ModelsExplorer } from '@/components/landing/ModelsExplorer';
import { Features } from '@/components/landing/Features';
import { RoiCalculator } from '@/components/landing/RoiCalculator';
import { CodeSandbox } from '@/components/landing/CodeSandbox';
import { Pricing } from '@/components/landing/Pricing';
import { FaqAccordion } from '@/components/landing/FaqAccordion';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ModelsExplorer />
      <Features />
      <RoiCalculator />
      <CodeSandbox />
      <Pricing />
      <FaqAccordion />
    </>
  );
}
