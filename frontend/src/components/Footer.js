import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="footer-container">
          <div className="footer-info">
            <h1>Book Store</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </p>
          </div>
          <div className="footer-links">
            <h2>Links</h2>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/">Books</a>
              </li>
              <li>
                <a href="/">About</a>
              </li>
            </ul>
          </div>
          <div className="footer-contact">
            <h2>Contact</h2>
            <ul>
              <li
                style={{
                  color: "gold",
                }}
              >
                Phone: 123456789
              </li>
              <li
                style={{
                  color: "gold",
                }}
              >
                Email: abayomiogunnusi@gmail.com
              </li>
              <li
                style={{
                  color: "gold",
                }}
              >
                Address: Lorem ipsum dolor sit amet consectetur
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
