import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(formData.username, formData.password);
      navigate("/chat");
    } catch (err) {
      setError(err.response?.data?.error || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h1>Chat App</h1>

        <p className="welcome-text">
          Welcome Back 👋
        </p>


        {error && (
          <div className="error">
            {error}
          </div>
        )}


        <form 
          className="login-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />


          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />


          <button 
            className="login-btn"
            type="submit"
          >

            {loading ? "Logging in..." : "Login"}

          </button>


        </form>


        <p className="login-footer">

          Don't have an account?

          <Link to="/register">
            {" "}Register
          </Link>

        </p>


      </div>

    </div>
  );
};

export default Login;