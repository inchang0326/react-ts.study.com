import React from "react";

interface LoadingProps {
  isLoading: boolean;
}

function withLoading<P extends Object>(
  WrappedComponent: React.ComponentType<P>
) {
  return class WithLoadingComponent extends React.Component<P & LoadingProps> {
    render() {
      console.log("withLoading");
      if (this.props.isLoading) {
        return (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <div>데이터 불러오는 중..</div>
          </div>
        );
      }

      return <WrappedComponent {...this.props}></WrappedComponent>;
    }
  };
}

export default withLoading;
