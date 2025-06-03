import React from "react";
import Navbar from "../components/Navbar.jsx";
import FeatureShow from "../components/FeatureShow.jsx";
import InfiniteMarquee from "../components/InfiniteMarquee.jsx";
import Footer from "../components/Footer.jsx";
import ShowDetail from "../components/ShowDetail.jsx";
const Feature = () => {
  return (
    <div>
      <Navbar />
      <FeatureShow />
      <InfiniteMarquee />
      <ShowDetail />
      <Footer />
    </div>
  );
};

export default Feature;
