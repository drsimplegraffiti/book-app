import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(
      "https://booka-app-be.vercel.app/api/users/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      setError(data.message);
      setLoading(false);
    } else {
      setMessage(data.message);
      setLoading(false);
      navigate("/login");
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
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <p className="have-an-account">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
        {error && <div id="error-message">{error}</div>}
        {message && <div className="alert alert-success mt-3">{message}</div>}
        {loading && <div className="alert alert-info mt-3">Loading...</div>}
      </div>
    </div>
  );
};

export default SignUp;
