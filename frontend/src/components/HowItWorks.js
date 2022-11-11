import React from "react";
import Bounce from "react-reveal/Bounce";

const HowItWorks = () => {
  return (
    <div className="how-it-works" id="how">
      <Bounce delay={500} distance="30px">
        <p className="how-it-works-paragraph">how it works</p>
        <h2 className="how-it-works-paragraph-2">
          Search for a book in three steps
        </h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam</p>

        <div className="how-it-works-cards">
          <div className="how-it-works-card">
            <img src="../assets/book.png" alt="" />
            <i
              className="fas fa-search"
              style={{ color: "#f9a826", fontSize: "2rem" }}
            ></i>
            <h3>Search</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </p>
          </div>
          <div className="how-it-works-card">
            <img src="../assets/book.png" alt="" />
            {/* payment icon */}
            <i
              className="fas fa-credit-card"
              style={{ color: "#f9a826", fontSize: "2rem" }}
            ></i>

            <h3>Pay</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </p>
          </div>
          <div className="how-it-works-card">
            <img src="../assets/book.png" alt="" />
            <i
              className="fas fa-book"
              style={{ color: "#f9a826", fontSize: "2rem" }}
            ></i>

            <h3>Read</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </p>
          </div>
        </div>
      </Bounce>
    </div>
  );
};

export default HowItWorks;
