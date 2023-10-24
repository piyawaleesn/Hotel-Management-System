import React from "react";
import Navbar from "../components/Navbar.tsx";
import Header from "../components/Home/Header.tsx";
import About from "../components/Home/About.tsx";
import Service from "../components/Home/Service.tsx";
import Rooms from "../components/Home/Rooms.tsx";
import Review from "../components/Home/Review.tsx";
import Footer from "../components/Footer.tsx";

function Home({ onSearchResult, setUserInput }) {
  return (
    <div>
      <Navbar />
      <Header setUserInput={setUserInput} onSearchResult={onSearchResult} />
      <About />
      <Service />
      <Rooms />
      <Review />
      <Footer />
    </div>
  );
}

export default Home;
