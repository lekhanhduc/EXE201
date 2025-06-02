import { useState } from "react";
import "./style.scss";
import loginBackground from "../../../assets/login/loginBackground.jpg";
import { Link } from "react-router-dom";
import { login } from "../../../api/authApi";
import GoogleLoginButton from "../../../component/googleLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setErrorMessage("");
    console.log("Logging in with:", { email, password });
    try {
      const result = await login({ email, password });
      console.log("login success: ", result);

      localStorage.setItem("accessToken", result.accessToken);
      window.location.href = "/";
    } catch (err) {
      console.error("Login failed:", err);
      setErrorMessage("Invalid username or password!");
    }
  };

  return (
    <div
      className="login_container"
      style={{ backgroundImage: `url(${loginBackground})` }}
    >
      <div className="login__overlay">
        <form className="login__form" id="form-1" onSubmit={handleSubmit}>
          <h1>Welcome Back</h1>

          {errorMessage && (
            <div className="login__error slide-in-right">
              <p>{errorMessage}</p>
            </div>
          )}

          <div className="login__field">
            <input
              type="text"
              placeholder="Email or phone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login__field">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="login__options">
            <Link to={"/forgotPassword"} className="forgot">
              Forgot Password?
            </Link>
          </div>

          <div className="login__submit">
            <button type="submit">Login</button>
          </div>

          <div className="login__google">
            <GoogleLoginButton setErrorMessage={setErrorMessage} />
          </div>

          <div className="login__register">
            Don't have an account?{" "}
            <Link to={"/register"} className="register-link">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
