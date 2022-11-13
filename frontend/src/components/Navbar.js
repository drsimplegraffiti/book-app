import { useState } from "react";
import Bounce from "react-reveal/Bounce";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const { dispatch, user } = useAuthContext();
  const navigate = useNavigate();

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  const handleClick = () => {
    if (user) {
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
      navigate("/");
    }
  };
  return (
    <Bounce top duration={2500}>
      <div className={navbar ? "top-navbar-scrolled" : "top-navbar"}>
        <div className="top-navbar-left">
          <a href="/">
            <img src="../assets/africa.png" alt="" />
          </a>
          <div className="top-navbar-links">
            <a href="#testimonials">Testimonials</a>
            <a href="#how">How it works</a>
            <a href="#find">Find Book</a>
            <a href="#best">Best selling</a>
          </div>
        </div>
        {user ? (
          <div className="top-navbar-right">
            <a href="/upload">
              <i className="fas fa-upload"></i>
            </a>
            <a
              href="/profile"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "black",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </a>
            <a href="/logout">
              <button
                onClick={handleClick}
                style={{
                  color: "teal",
                  border: "none",
                  fontSize: "1rem",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                }}
              >
                Logout
              </button>
            </a>
          </div>
        ) : (
          <div className="top-navbar-right">
            <a href="/login">Login</a>
            <a href="/signup">Signup</a>
          </div>
        )}
      </div>
    </Bounce>
  );
};

export default Navbar;
