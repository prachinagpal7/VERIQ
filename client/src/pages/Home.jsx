import React from "react";
import Navbar from "../components/homeComponents/Navbar";
import Hero from "../components/homeComponents/Hero";
import Features from "../components/homeComponents/Features";
import HowItWorks from "../components/homeComponents/HowItWorks";
import PlatformPreview from "../components/homeComponents/PlatformPreview";
import CTA from "../components/homeComponents/CTA";
import Footer from "../components/homeComponents/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <PlatformPreview />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;

