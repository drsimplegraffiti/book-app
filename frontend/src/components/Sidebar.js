import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-heading">
        <h1>Categories</h1>

        <input type="checkbox" id="check" />
        <label for="check" className="checkbtn">
          <i className="fas fa-bars"></i>
        </label>

        <ul>
          <li>
            <a href="#/">Home</a>
          </li>
          <li>
            <a href="#/">About</a>
          </li>
          <li>
            <a href="#/">Contact</a>
          </li>
          <li>
            <a href="#/">Feedback</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
