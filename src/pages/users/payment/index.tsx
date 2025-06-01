import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.scss";

interface PaymentState {
  productName: string;
  depositPrice: string;
  quantity: number;
  customerName: string;
  phone: string;
  email: string;
}

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as PaymentState | undefined;

  if (!state) {
    return <div>Không có dữ liệu thanh toán. Vui lòng đặt hàng trước.</div>;
  }

  const handlePayment = () => {
    alert(`Thanh toán thành công cho sản phẩm ${state.productName}
    \nSố lượng: ${state.quantity}
    \nKhách hàng: ${state.customerName}`);
    navigate("/");
  };

  return (
    <div className="payment-container">
      <h2>Thanh toán</h2>
      <p>
        <strong>Sản phẩm:</strong> {state.productName}
      </p>
      <p>
        <strong>Giá cọc:</strong> {state.depositPrice}
      </p>
      <p>
        <strong>Số lượng:</strong> {state.quantity}
      </p>
      <p>
        <strong>Khách hàng:</strong> {state.customerName}
      </p>
      <p>
        <strong>Điện thoại:</strong> {state.phone}
      </p>
      <p>
        <strong>Email:</strong> {state.email}
      </p>

      <button onClick={handlePayment}>Thanh toán ngay</button>
    </div>
  );
};

export default Payment;
