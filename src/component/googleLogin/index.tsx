import { useCallback, useState, useEffect, Suspense } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { SignInWithGoogle } from "../../api/authService";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
  </div>
);

function CallbackGoogleContent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSendCode = useCallback(
    async (code: string) => {
      console.log("Received code:", code);
      setIsLoading(true);
      try {
        const data = await SignInWithGoogle(code);
        if (data.result && data.result.accessToken && data.result.refreshToken) {
          localStorage.setItem("accessToken", data.result.accessToken);
          toast.success("Đăng nhập Google thành công! 🎉", {
            duration: 3000,
            position: "top-right",
          });
          navigate("/");
        } else {
          throw new Error("Không nhận được token từ server.");
        }
      } catch (error: any) {
        console.error("Lỗi xác thực Google:", error);
        let errorMessage = "Lỗi không xác định";
        if (error.response) {
          errorMessage = error.response.data?.message || `HTTP ${error.response.status}: ${error.response.statusText}`;
        } else if (error.request) {
          errorMessage = "Lỗi kết nối mạng. Vui lòng kiểm tra internet.";
        } else {
          errorMessage = error.message;
        }
        setError(`Lỗi xác thực: ${errorMessage}`);
        toast.error(`Lỗi: ${errorMessage}`, {
          duration: 5000,
          position: "top-right",
        });
      } finally {
        setIsLoading(false); // Tắt spinner sau khi xử lý xong
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (code) {
      handleSendCode(code);
    } else {
      setError("Không tìm thấy mã xác thực trong URL");
      setIsLoading(false); // Tắt spinner nếu không có code
      toast.error("Không tìm thấy mã xác thực trong URL", {
        duration: 5000,
        position: "top-right",
      });
    }
  }, [code, handleSendCode]);

  if (isLoading) {
    return <LoadingSpinner />; // Hiển thị spinner khi đang xử lý
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Callback Google</h1>
      {error ? (
        <div className="text-red-600 mb-4 text-center max-w-md">
          {error}
          <button
            onClick={() => navigate("/login")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 block mx-auto"
          >
            Quay lại đăng nhập
          </button>
        </div>
      ) : (
        <p className="text-gray-600">Đang chuyển hướng về ứng dụng...</p>
      )}
    </div>
  );
}

export default function CallbackGoogle() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CallbackGoogleContent />
    </Suspense>
  );
}