import React from "react";
import Hero from "../Components/Hero";
import LatestCollection from "../Components/LatestCollection";
import BestSeller from "../Components/BestSeller";
import Policy from "../Components/Policy";
import NewsLetter from "../Components/NewsLetter";
import Testimonials from "../Components/Testimonials";
import FAQ from "../Components/FAQ";
import BrandSlider from "../Components/BrandSlider";
import ScrollReveal from "../Components/ScrollReveal";

const Home = () => {
  return (
    <div>
      <Hero />
      <ScrollReveal> <BrandSlider/>  </ScrollReveal> 
      <ScrollReveal> <LatestCollection /> </ScrollReveal>
      <ScrollReveal> <BestSeller/> </ScrollReveal>
      <ScrollReveal> <Policy/> </ScrollReveal>
      <ScrollReveal> <Testimonials/> </ScrollReveal>
      <ScrollReveal> <FAQ/> </ScrollReveal>
      <ScrollReveal>  <NewsLetter/> </ScrollReveal>
    </div>
  );
};

export default Home;
