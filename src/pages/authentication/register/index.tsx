import "./style.scss";
import loginBackground from "../../../assets/login/loginBackground.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { register, type RegisterRequest } from "../../../api/authApi";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage("");
    console.log({ email, firstName, lastName, password });
    try {
      const request: RegisterRequest = {
        email,
        password,
        firstName,
        lastName,

      }
      const result = await register(request);
      if (result.code === 201) {
        window.location.href = "/login";
      }

      window.location.href = "/login"
    } catch (err) {
      setErrorMessage("Register failed. Please try again!");
    }
  };

  return (
    <div
      className="register_container"
      style={{ backgroundImage: `url(${loginBackground})` }}
    >
      <div className="register__overlay">
        <form
          className="register__form"
          id="form-register"
          onSubmit={handleSubmit}
        >
          <h1>Create Account</h1>

          {errorMessage && (
            <div className="register__error">{errorMessage}</div>
          )}

          <div className="register__field">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="register__field">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="register__field">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="register__field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="register__submit">
            <button type="submit" onClick={handleSubmit}>Register</button>
          </div>

          <div className="register__register">
            Already have an account?{" "}
            <Link to={"/login"} className="login-link">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
