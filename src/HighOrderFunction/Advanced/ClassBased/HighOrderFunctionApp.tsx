import React from "react";
import UserProfile from "../FunctionBased/UserProfile";
import ProductList from "./ProductList";

const HighOrderFunctionApp: React.FC = () => {
  console.log("HighOrderFunctionApp");
  const [currentView, setCurrentView] = React.useState<"profile" | "products">(
    "profile"
  );
  const [isLoading, setLoading] = React.useState(false);
  const createNavigationHandler = (view: "profile" | "products") => {
    let handle: number = 0;
    return () => {
      setCurrentView(view);
      setLoading(true);
      handle = window.setTimeout(() => {
        setLoading(false);
      }, 5000);
    };
  };

  return (
    <div>
      <nav>
        <button onClick={createNavigationHandler("profile")}>프로필</button>
        <button onClick={createNavigationHandler("products")}>상품</button>
      </nav>
      <main>
        {currentView === "profile" && (
          <UserProfile isLoading={isLoading} doAuth={true}></UserProfile>
        )}
        {currentView === "products" && (
          <ProductList isLoading={isLoading} doAuth={false}></ProductList>
        )}
      </main>
    </div>
  );
};

export default HighOrderFunctionApp;
