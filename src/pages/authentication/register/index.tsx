import "./style.scss";
import loginBackground from "../../../assets/login/loginBackground.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem("confirmPassword") as HTMLInputElement).value;

    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage("");
    console.log({ name, email, password });
  };

  return (
    <div
      className="register_container"
      style={{ backgroundImage: `url(${loginBackground})` }}
    >
      <div className="register__overlay">
        <form className="register__form" id="form-register" onSubmit={handleSubmit}>
          <h1>Create Account</h1>

          {errorMessage && (
            <div className="register__error">{errorMessage}</div>
          )}

          <div className="register__field">
            <input type="text" name="name" placeholder="Full Name" required />
          </div>

          <div className="register__field">
            <input type="email" name="email" placeholder="Email address" required />
          </div>

          <div className="register__field">
            <input type="password" name="password" placeholder="Password" required />
          </div>

          <div className="register__field">
            <input type="password" name="confirmPassword" placeholder="Confirm Password" required />
          </div>

          <div className="register__submit">
            <button type="submit">Register</button>
          </div>

          <div className="register__register">
            Already have an account? <Link to={"/login"} className="login-link">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
