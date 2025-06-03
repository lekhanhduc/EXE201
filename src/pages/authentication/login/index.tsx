import { useState } from "react";
import "./style.scss";
import loginBackground from "../../../assets/login/loginBackground.jpg";
import { Link } from "react-router-dom";
import { login } from "../../../api/authApi";
import { GoogleConfiguration } from "../../../configuration/GoogleConfiguration";

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

  const handleGoogleLogin = () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GoogleConfiguration.client_id}&redirect_uri=${GoogleConfiguration.redirect_uri}&response_type=${GoogleConfiguration.response_type}&scope=${GoogleConfiguration.scope}&prompt=consent`;
    window.location.href = url;
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
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="google-login-btn"
              style={{
                width: '100%',
                backgroundColor: 'white',
                color: '#333',
                border: '1px solid #dadce0',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundColor = '#f8f9fa';
                target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundColor = 'white';
                target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              }}
            >
              {/* Google Icon */}
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Đăng nhập với Google</span>
            </button>
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
