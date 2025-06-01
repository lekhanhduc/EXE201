import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductData from "../../data/productData";
import "./style.scss"

const PurchaseForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = ProductData.find((item) => item.id === Number(id));

  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(1);
  
  if (!product) {
    return <div>Thiết bị không tồn tại.</div>;
  }
  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  navigate("/payment", {
    state: {
      productName: product.name,
      depositPrice: product.depositPrice,
      quantity,
      customerName: name,
      phone,
      email,
    },
  });
};
    
  return (
    <div className="purchase-form-container">
      <h2>Đặt thuê thiết bị</h2>
      <p><strong>{product.name}</strong></p>
      <p>Giá cọc: {product.depositPrice}</p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <label>
          Tên khách hàng:
          <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <label>
          Số điện thoại:
          <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>

        <label>
          Email:
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          Số lượng:
          <input type="number" min={1} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
        </label>

        <button type="submit" style={{ padding: "10px 0", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
          Đặt thuê
        </button>
      </form>
    </div>
  );
};

export default PurchaseForm;
