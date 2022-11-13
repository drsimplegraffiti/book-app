import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      setLoading(false);
    } else {
      setMessage(data.message);
      setLoading(false);
      navigate("/");
    }

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-container-left">
        <img src="../assets/book3.png" alt="background" />
      </div>

      <div className="auth-container-right">
        <h1 className="text-center back-home">
          <Link to="/">
            <i className="fas fa-home"></i>
          </Link>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>

            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="password-toggle">
                {showPassword ? (
                  <i
                    className="fas fa-eye-slash"
                    onClick={() => setShowPassword(false)}
                  ></i>
                ) : (
                  <i
                    className="fas fa-eye"
                    onClick={() => setShowPassword(true)}
                  ></i>
                )}
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            {loading ? "Loading..." : "Login"}
          </button>
          <p className="have-an-account">
            Don't have an account? <Link to="/signup">Register</Link>
          </p>
        </form>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
