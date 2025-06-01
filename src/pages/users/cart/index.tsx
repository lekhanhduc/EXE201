import { Link } from "react-router-dom";
import "./style.scss"
const Cart = () => {
  return (
    <div>
      <Link to="/mycart" className="dropdown-item">
        My Cart
      </Link>
    </div>
  );
};

export default Cart;
