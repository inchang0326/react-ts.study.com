import React from "react";

// 컴포넌트를 인자로 받고 컴포넌트를 반환하는 고차 함수
// 고차 함수는 보통 로직을 공통화 하는.. 횡단 관심사에 사용함 => SpringBoot의 Aspect. 즉, SpringAOP(Aspect Oriented Programming)
/**
 *  무엇이 횡단 관심사이고 왜 횡단 관심사인가?
 *  - 횡단 관심사는 여러 도메인에서 사용하는 특정 공통 관심사를 의미함
 *  - 예를들어, 수신, 여신은 은행에서의 종단 관심사임. 그리고 수신, 여신 모두 인증이라는 공통 관심사를 갖고 있는데, 이게 바로 횡단 관심사임
 *  = 수신 모듈도 여신 모듈도 모두 인증 모듈이 필요하기 때문에, 고차 함수 통해 수신/여신 모듈에 인증 모듈을 Wraaping 하는 것임
 */
export function withLoading<P>(
  WrappedComponent: React.ComponentType<P>
): React.ComponentType<P> {
  return class WithLoading extends React.Component<P, { loading: boolean }> {
    private handle: number = 0;

    state = {
      loading: true,
    };

    render() {
      if (this.state.loading) {
        return <div>로딩 중</div>;
      }

      return (
        <WrappedComponent
          {...this.props}
          loadingComplete={true}
        ></WrappedComponent>
      );
    }

    componentDidMount() {
      // 2초 후 로딩 완료
      this.handle = setTimeout(() => {
        // 지정된 시간에 내부 로직을 수행하는 타이머 함수
        this.setState({ loading: false });
      }, 2000);
    }

    // componentDidMount 리소스 사용 => componentWillUnmount 리소스 해제
    componentWillUnmount(): void {
      window.clearTimeout(this.handle);
      this.handle = 0;
    }
  };
}
