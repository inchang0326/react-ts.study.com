import React from "react";
import UserProfile from "./WithLoadingTest";
import { withLoading } from "./withLoading";
import ProductInfo from "./WithLoadingTest2";

const UserProfileWithLoading = withLoading(UserProfile);
const ProductInfoWithLoading = withLoading(ProductInfo);

const WithLoadingTestApp: React.FC = () => {
  return (
    <div>
      <h2>
        컴포넌트를 매개한 후 특정 공통 로직의 Wrapped 컴포넌트를 반환하는 테스트
        (like Spring AOP)
      </h2>
      <UserProfileWithLoading
        name={"홍길동"}
        email={"teady.kang@kakaobank.com"}
      ></UserProfileWithLoading>
      <ProductInfoWithLoading
        name={"커피머신"}
        price={"30,000원"}
      ></ProductInfoWithLoading>
    </div>
  );
};

export default WithLoadingTestApp;
