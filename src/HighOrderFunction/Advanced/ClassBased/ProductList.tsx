import React from "react";
import withLoading from "./withLoading";
import withAuth from "../FunctionBased/withAuth";

type UserType = {
  id: string;
  name: string;
};

interface Product {
  id: string;
  name: string;
  price: string;
}

interface ProductListProps {
  user?: UserType;
}

interface ProductListState {
  products: Array<Product>;
}

class ProductList extends React.Component<ProductListProps, ProductListState> {
  state: ProductListState = { products: [] };

  render() {
    console.log("ProductList");
    const { products } = this.state;
    const { user } = this.props;
    return (
      <div>
        <h2>{user?.name ? `${user.name} 님을 위한 상품` : "상품"}</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - {product.price}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withAuth(withLoading(ProductList));
