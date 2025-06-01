import CategorySidebar from "../../../component/categoryProps";
import HomeFilter from "../../../component/homeFilter";
import ProductList from "../../../component/productList";
import "./style.scss";

const DecideEvent = () => {
  return (
    <div className="decideEvent__container">
      <HomeFilter />
      <div className="decideEvent__content">
        <CategorySidebar />
        <ProductList />
      </div>
    </div>
  );
};

export default DecideEvent;
