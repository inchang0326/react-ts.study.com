import React, { useState, useEffect } from "react";

type UserType = {
  id: string;
  name: string;
};

interface WithAuthProps {
  doAuth: boolean;
  user?: UserType;
}

export default function withAuth<P extends Object>( // Props에 대한 generic <P>, 그리고 Object로 제약 함
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAuthComponent(props: P & WithAuthProps) {
    console.log("withAuth");

    if (!props.doAuth) return <WrappedComponent {...props}></WrappedComponent>;

    const [auth, setAuth] = useState<boolean>(false);
    const [user, setUser] = useState<WithAuthProps["user"]>({
      id: "",
      name: "",
    });
    const [loading, setLoading] = useState(true);

    // useEffect는 Component가 mount된 직후(최초 renderd) 수행됨 = class based component의 componentDidMount()
    // useEffect() 내에서 큐 스케쥴링 되는 setState()가 여러개더라도, 가상 DOM과 실제 DOM의 Diff 비교 후 1번만 re-rendring 함
    useEffect(() => {
      console.log("withAuth useEffect");
      const check = async () => {
        // async 키워드는 해당 함수 내 비동기 로직이 있을 수 있다는 것을 표현함
        try {
          const token = "free-pass";
          if (token) {
            // 예시 비동기 fetch API와 await(기다림-동기)로, async와 함께 사용할 수 있음
            // const user = await fetch('/api/user/1');
            const user = { id: "1", name: "teady" };
            setUser(user); // 비동기 큐 스케쥴링(순서보장)
            setAuth(true); // 비동기 큐 스케쥴링(순서보장)
          }
        } catch (error) {
          console.error("Failed: ", error);
        } finally {
          setLoading(false); // 비동기 큐 스케쥴링(순서보장)
        }
      };

      check();

      return () => {
        // 리소스 해제
      };
    }, []);

    if (loading) {
      return <div>로딩 중..</div>;
    }

    if (!auth) {
      return <div>로그인이 필요합니다!</div>;
    }

    return <WrappedComponent {...props} user={user}></WrappedComponent>;
  };
}
