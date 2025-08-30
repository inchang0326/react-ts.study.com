import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

interface ReactQueryTestAppProps {}

// Promise를 반환하지 않는 setTimeout을 Promise를 반환할 수 있도록 래핑함(async/await 흐름은 Promise가 사용할 수 있음)
const sleep = (delay: number) => {
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const fetchTodoList = async () => {
  await sleep(2000);
  const res = await axios.get("/api/todolis/gdhong");
  return res;
};

export default function ReactQueryTestApp(props: ReactQueryTestAppProps) {
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: ["todoList"],
    queryFn: fetchTodoList,
  });

  // 문서 권고: 모든 에러를 경계에 위임하려면 수동 throw (isFetching 중에는 던지지 않음)
  if (error && !isFetching) throw error; // React Query v5 가이드

  return (
    <div>
      <h3>{JSON.stringify(data, null, 2)}</h3>
    </div>
  );
}
