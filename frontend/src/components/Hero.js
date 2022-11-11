import React from "react";
import Zoom from "react-reveal/Zoom";

const Hero = () => {
  return (
    <div className="hero">
      <Zoom>
        <div className="hero-left">
          <h1>Find your next adventure</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptates, quod, quia, voluptate quae voluptatem quidem quas
            necessitatibus voluptatum quibusdam quos. Quisquam, quae.
            voluptates, quod, quia, voluptate quae voluptatem quidem quas
          </p>
          <button>
            <a href="#search">Get Started</a>
          </button>
        </div>
    
        <div className="hero-right">
          <img src="../assets/book2.png" alt="" />
        </div>
      </Zoom>
    </div>
  );
};

export default Hero;
