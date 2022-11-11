import React from "react";


const Testimonials = () => {
  return (
    <div className="testimonials" id="testimonials">
      <p className="testimonials-paragraph">Testimonials</p>
      <h2 className="testimonials-header">What people are saying</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam</p>

      <div className="testimonials-cards">
        <div className="testimonials-card">
          <img src="../assets/ceo1.jpg" alt="" />

          <h2>John Kent</h2>
          <p>
            This is the best booking site ever to collect a number of bookings
          </p>
         
        </div>
        <div className="testimonials-card">
          <img src="../assets/ceo2.jpg" alt="" />

          <h2>Amber lee</h2>
          <p>
            This is the best booking site ever to collect a number of bookings
          </p>
         
        </div>
        <div className="testimonials-card">
          <img src="../assets/ceo3.jpg" alt="" />

          <h2>Stevie Curry</h2>
          <p>
            This is the best booking site ever to collect a number of bookings
          </p>
         
        </div>
        <div className="testimonials-card">
          <img src="../assets/ceo4.jpg" alt="" />

          <h2>Jane Doe</h2>
          <p>
            This is the best booking site ever to collect a number of bookings
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
