// 함수를 인자로 받고 함수를 반환하는 고차 함수
// 고차 함수는 보통 로직을 공통화 하는.. 횡단 관심사에 사용함 => SpringBoot의 Aspect. 즉, SpringAOP(Aspect Oriented Programming)
/**
 *  무엇이 횡단 관심사이고 왜 횡단 관심사인가?
 *  - 횡단 관심사는 여러 도메인에서 사용하는 특정 공통 관심사를 의미함
 *  - 예를들어, 수신, 여신은 은행에서의 종단 관심사임. 그리고 수신, 여신 모두 인증이라는 공통 관심사를 갖고 있는데, 이게 바로 횡단 관심사임
 *  = 수신 모듈도 여신 모듈도 모두 인증 모듈이 필요하기 때문에, 고차 함수 통해 수신/여신 모듈에 인증 모듈을 Wraaping 하는 것임
 */
export const withLogging = (fn: Function) => {
  return (...args: any) => {
    console.log(`함수명: ${fn.name}`);
    console.log(`실행값: ${fn(...args)}`);
  };
};
