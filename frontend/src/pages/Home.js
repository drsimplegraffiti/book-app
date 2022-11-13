import BestSellingBooks from "../components/BestSellingBooks";
import Books from "../components/Books";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/Navbar";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div className="container">
      <Navbar />
      <Hero />
      <HowItWorks />
      {/* <Stats /> */}
      <BestSellingBooks />
      <Testimonials />
      <Books />
      <Footer />
    </div>
  );
};

export default Home;
