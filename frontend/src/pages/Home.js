import BestSellingBooks from "../components/BestSellingBooks";
import Books from "../components/Books";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/Navbar";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div className="container">
      <Navbar />
      <Hero />
      <HowItWorks />
      <BestSellingBooks />
      <Testimonials />
      <Books />
      <Footer />
    </div>
  );
};

export default Home;
