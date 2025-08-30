import React from "react";

interface ProductInfoProps {
  name: string;
  price: string;
  loadingComplete?: boolean;
}

// <>에 Props만 받는 이유는, FC의 경우가 그럼, state는 FC 특성상 내부에서 선언하기 때문임
const ProductInfo: React.FC<ProductInfoProps> = (props: ProductInfoProps) => {
  return (
    <div>
      <h2>상품 정보</h2>
      <p>이름: {props.name}</p>
      <p>가격: {props.price}</p>
      {props.loadingComplete && <p>로딩 완료!</p>}
    </div>
  );
};

export default ProductInfo;
