import React from "react";
import Hero from "../../components/about/Hero";
import MainpageLayout from "../../components/layout/MainpageLayout";
import Footer from "../../components/Footer/Footer";
export default function page() {
  return (
    <div>
      <MainpageLayout>
        <Hero />
        <Footer />
      </MainpageLayout>
    </div>
  );
}
