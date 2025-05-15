import "./style.scss";
import loginBackground from "../../../assets/login/loginBackground.jpg";

const ForgotPassword = () => {
  return (
    <div
      className="forgotPassword_container"
      style={{ backgroundImage: `url(${loginBackground})` }}
    >
      <div className="forgotPassword__overlay">
        <form className="forgotPassword__form" id="form-forgot">
          <h1>Forgot Password</h1>

          <div className="forgotPassword__field">
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="forgotPassword__submit">
            <button type="submit">Send Reset Link</button>
          </div>

          <div className="forgotPassword__register">
            Remember your password? <a href="/login">Back to Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
