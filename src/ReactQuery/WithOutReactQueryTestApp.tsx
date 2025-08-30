import { useEffect, useState } from "react";
import axios from "axios";

interface WithOutReactQueryTestAppProps {}

// Promise를 반환하지 않는 setTimeout을 Promise를 반환할 수 있도록 래핑함(async/await 흐름은 Promise가 사용할 수 있음)
const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const fetchTodoList = async () => {
  await sleep(2000);
  const res = await axios.get("/api/todolist/gdhong");
  return res;
};

export default function WithOutReactQueryTestApp(
  props: WithOutReactQueryTestAppProps
) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchTodoList()
      .then((result) => setData(result.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading..</p>;
  }

  if (error) {
    return <p>Error..</p>;
  }

  return (
    <div>
      <h3>{JSON.stringify(data, null, 2)}</h3>
    </div>
  );
}
