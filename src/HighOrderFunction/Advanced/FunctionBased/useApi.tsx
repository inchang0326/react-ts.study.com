import { useState, useEffect, useCallback } from "react";

interface UseApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function useApi<T>(
  fetchFunction: () => Promise<T>,
  /**
   *  의존성 배열에 따른 useCallback 캐싱 효과 극대화 위함
   *  예를들어, fetchFunction()은 사용자 정보 획득 함수임 dependencies가 userId라면 이전 userId에 대한 데이터는 캐싱된 값을 반환함)
   */
  dependencies: any[] = []
): UseApiResponse<T> {
  console.log("useApi");
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const result = await fetchFunction();
      setData(result);
    } catch (error) {
      setError(error instanceof Error ? error.message : "알 수 없는 오류");
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}

export default useApi;
