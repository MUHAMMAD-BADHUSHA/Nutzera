import { LoadingScreen } from "@/components/sections/LoadingScreen"
import { Hero } from "@/components/sections/Hero"
import { BrandStory } from "@/components/sections/BrandStory"
import { IngredientsShowcase } from "@/components/sections/IngredientsShowcase"
import { ProductExperience } from "@/components/sections/ProductExperience"
import { NutritionBenefits } from "@/components/sections/NutritionBenefits"
import { WhyChooseNutzera } from "@/components/sections/WhyChooseNutzera"
import { ProductJourney } from "@/components/sections/ProductJourney"
import { Testimonials } from "@/components/sections/Testimonials"
import { FAQ } from "@/components/sections/FAQ"
import { Sustainability } from "@/components/sections/Sustainability"
import { Contact } from "@/components/sections/Contact"

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Hero />
      <BrandStory />
      <IngredientsShowcase />
      <ProductExperience />
      <NutritionBenefits />
      <WhyChooseNutzera />
      <ProductJourney />
      <Testimonials />
      <FAQ />
      <Sustainability />
      <Contact />
    </>
  )
}
