import axios from "axios";
import { useEffect } from "react";

/**
 *  테스트 케이스#1) Vite Proxy Server 또는 타겟 백엔드 서버의 CORS 허용 없이, 타겟 백엔드 서버로(http://localhost:8080) API 요청
 *  => Origin은 자동으로 프론트엔드 서버인 http://localhost:5173 설정됨(백엔드 서버에서 확인). 따라서 Cross Origin Error 발생
 *
 *  문제 해결 위해,
 *  테스트 케이스#1-1) 타겟 백엔드 서버에서(http://localhost:8080) CORS 허용
 *  => Origin은 자동으로 프론트엔드 서버인 http://localhost:5173 설정됨(백엔드 서버에서 확인). 그럼에도 백엔드 서버 CORS 허용으로 정상
 *  테스트 케이스#1-2) Vite Proxy Server(changeOrigin: http://localhost:8080)
 *  => 따라서 Cross Origin Error 발생하지 않고 정상. 그런데 타겟 백엔드 서버에선 여전히 Origin이 http://localhost:5173으로 찍힘?
 *     복잡하네..
 *  >> AI 답변 종합 결과,
 *     브라우저 입장에선 origin을 여전히 5173으로 요청함
 *     vite proxy 서버가 8080으로 타겟 백엔드 서버로 대리 요청함(이때, req header의 origin을 수정하진 않음 *오해 포인트)
 * 그리고 백엔드는 cross origin을 직접 차단하지 않음 통신 후 알려만 주는데 vite의 8080 대리 통신함
 * 결국 cross origin 오류가 발생하지 않음
 */

const getProducts = async () => {
  const promise = await axios.patch("/api/users/1");
  console.log(promise.data);
};

const OriginTestApp = () => {
  useEffect(() => {
    getProducts();
  }, []);

  return <div></div>;
};

export default OriginTestApp;
