import { GoogleLogin, GoogleOAuthProvider, type CredentialResponse } from "@react-oauth/google";
import { signInGoogle } from "../../api/authApi";

interface Props {
  setErrorMessage: (msg: string) => void;
}

const GoogleLoginButton: React.FC<Props> = ({ setErrorMessage }) => {
  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    const code = credentialResponse?.credential;

    if (code) {
      try {
        const result = await signInGoogle(code);
        console.log("Google login success:", result);

        localStorage.setItem("accessToken", result.accessToken);
        window.location.href = "/";
      } catch (err) {
        console.error("Google login failed:", err);
        setErrorMessage("Google login failed!");
      }
    } else {
      setErrorMessage("Google login failed: no code received.");
    }
  };

  return (
    <GoogleOAuthProvider clientId="441587123979-qds882ebt12bna4t4pldj9ausd2udpu2.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => setErrorMessage("Google login failed!")}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
