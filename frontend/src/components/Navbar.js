import { useState } from "react";
import Bounce from "react-reveal/Bounce";

const Navbar = () => {
  // change the state of the navbar when the user scrolls down
  const [navbar, setNavbar] = useState(false);
  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  return (
    <Bounce top duration={2500}>
      <div className={navbar ? "top-navbar-scrolled" : "top-navbar"}>
        <div className="top-navbar-left">
          <a href="/">
            <img src="../assets/africa.png" alt="" />
            {/* <i
              className="fas fa-book"
              style={{ color: "tomato", fontSize: "2rem" }}
            ></i> */}
          </a>
          <div className="top-navbar-links">
            <a href="#testimonials">Testimonials</a>
            <a href="#how">How it works</a>
            <a href="#find">Find Book</a>
            <a href="#best">Best selling</a>
          </div>
        </div>
        <div className="top-navbar-right">
          <a href="#search">Explore</a>
        </div>
      </div>
    </Bounce>
  );
};

export default Navbar;
