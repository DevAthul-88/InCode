import React from "react";
import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Features from "../components/features";
import Footer from "../components/footer";
import Hero2 from "../components/hero2";

function home() {
  document.title = "InCode - Home"
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Hero2 />
      <Footer />
    </div>
  );
}

export default home;
