import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.scss";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  categoryName: string;
  imageUrl: string;
  reviews: any[];
}

interface ApiResponse {
  code: number;
  result: Product;
}

interface Address {
  street: string;
  ward: string;
  district: string;
  city: string;
  country: string;
}

interface OrderResponse {
  error: number;
  message: string;
  data: {
    bin: string;
    accountNumber: string;
    accountName: string;
    amount: number;
    description: string;
    orderCode: number;
    currency: string;
    paymentLinkId: string;
    status: string;
    expiredAt: string | null;
    checkoutUrl: string;
    qrCode: string;
  };
}

const PurchaseForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Form states
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [rentalStartDate, setRentalStartDate] = useState("");
  const [rentalEndDate, setRentalEndDate] = useState("");
  const [address, setAddress] = useState<Address>({
    street: "",
    ward: "",
    district: "",
    city: "Đà Nẵng",
    country: "Việt Nam"
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/products/${id}`);
        const data: ApiResponse = await response.json();

        if (data.code === 200) {
          setProduct(data.result);
        } else {
          setError("Không thể tải thông tin sản phẩm");
        }
      } catch (err) {
        setError("Lỗi kết nối API");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const calculateTotalPrice = () => {
    return product ? product.price * quantity : 0;
  };

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= (product?.stockQuantity || 1)) {
      setQuantity(value);
    }
  };

  const handleAddressChange = (field: keyof Address, value: string) => {
    setAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!customerName.trim()) return "Vui lòng nhập tên khách hàng";
    if (!phone.trim()) return "Vui lòng nhập số điện thoại";
    if (!email.trim()) return "Vui lòng nhập email";
    if (!rentalStartDate) return "Vui lòng chọn ngày bắt đầu thuê";
    if (!rentalEndDate) return "Vui lòng chọn ngày kết thúc thuê";
    if (!address.street.trim()) return "Vui lòng nhập địa chỉ đường";
    if (!address.ward.trim()) return "Vui lòng nhập phường/xã";
    if (!address.district.trim()) return "Vui lòng nhập quận/huyện";

    if (new Date(rentalStartDate) >= new Date(rentalEndDate)) {
      return "Ngày kết thúc phải sau ngày bắt đầu";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    if (!product) return;

    setSubmitting(true);

    const orderData = {
      productId: product.id,
      productName: product.name,
      description: product.description,
      returnUrl: "http://localhost:3000/success",
      cancelUrl: "http://localhost:3000/cancel",
      price: calculateTotalPrice(),
      quantity,
      rentalStartDate,
      rentalEndDate,
      address
    };

    try {
      const response = await fetch("http://localhost:8080/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify(orderData),
      });

      const result: OrderResponse = await response.json();

      if (result.error === 0 && result.data.checkoutUrl) {
        // Chuyển hướng đến trang thanh toán
        window.location.href = result.data.checkoutUrl;
      } else {
        alert("Có lỗi xảy ra khi tạo đơn hàng: " + result.message);
      }
    } catch (err) {
      console.error("Error creating order:", err);
      alert("Có lỗi xảy ra khi xử lý đơn hàng");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="purchase-form-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Đang tải thông tin sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="purchase-form-container">
        <div className="error">
          <p>{error}</p>
          <button onClick={() => navigate(-1)} className="btn-secondary">
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="purchase-form-container">
        <div className="error">
          <p>Sản phẩm không tồn tại</p>
          <button onClick={() => navigate(-1)} className="btn-secondary">
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="purchase-form-container">
      <div className="product-info">
        <div className="product-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="product-details">
          <h1>{product.name}</h1>
          <p className="description">{product.description}</p>
          <div className="price-info">
            <span className="price">{product.price.toLocaleString()} VNĐ</span>
            <span className="category">{product.categoryName}</span>
          </div>
          <p className="stock">Còn lại: {product.stockQuantity} sản phẩm</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rental-form">
        <h2>Thông tin đặt thuê</h2>

        <div className="form-section">
          <h3>Thông tin khách hàng</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="customerName">
                Tên khách hàng <span className="required">*</span>
              </label>
              <input
                id="customerName"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nhập họ và tên"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">
                Số điện thoại <span className="required">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Nhập số điện thoại"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập địa chỉ email"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Chi tiết thuê</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantity">
                Số lượng <span className="required">*</span>
              </label>
              <div className="quantity-control">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="quantity-btn"
                >
                  -
                </button>
                <input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                  min={1}
                  max={product.stockQuantity}
                  className="quantity-input"
                />
                <button
                  type="button"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stockQuantity}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
            </div>
            <div className="total-price">
              <span>Tổng tiền: </span>
              <span className="amount">{calculateTotalPrice().toLocaleString()} VNĐ</span>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">
                Ngày bắt đầu thuê <span className="required">*</span>
              </label>
              <input
                id="startDate"
                type="date"
                value={rentalStartDate}
                onChange={(e) => setRentalStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">
                Ngày kết thúc thuê <span className="required">*</span>
              </label>
              <input
                id="endDate"
                type="date"
                value={rentalEndDate}
                onChange={(e) => setRentalEndDate(e.target.value)}
                min={rentalStartDate || new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Địa chỉ giao hàng</h3>
          <div className="form-group">
            <label htmlFor="street">
              Số nhà, tên đường <span className="required">*</span>
            </label>
            <input
              id="street"
              type="text"
              value={address.street}
              onChange={(e) => handleAddressChange('street', e.target.value)}
              placeholder="Ví dụ: 07 Trần Quốc Vượng"
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="ward">
                Phường/Xã <span className="required">*</span>
              </label>
              <input
                id="ward"
                type="text"
                value={address.ward}
                onChange={(e) => handleAddressChange('ward', e.target.value)}
                placeholder="Ví dụ: Hòa Hải"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="district">
                Quận/Huyện <span className="required">*</span>
              </label>
              <input
                id="district"
                type="text"
                value={address.district}
                onChange={(e) => handleAddressChange('district', e.target.value)}
                placeholder="Ví dụ: Ngũ Hành Sơn"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">
                Thành phố <span className="required">*</span>
              </label>
              <input
                id="city"
                type="text"
                value={address.city}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">
                Quốc gia <span className="required">*</span>
              </label>
              <input
                id="country"
                type="text"
                value={address.country}
                onChange={(e) => handleAddressChange('country', e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-secondary"
          >
            Quay lại
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={submitting}
          >
            {submitting ? "Đang xử lý..." : "Đặt thuê ngay"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseForm;