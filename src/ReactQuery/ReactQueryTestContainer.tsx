import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ReactQueryTestApp from "./ReactQueryTestApp";
import WithOutReactQueryTestApp from "./WithOutReactQueryTestApp";

const cli = new QueryClient({ defaultOptions: { queries: {} } });

export default function ReactQueryTestContainer() {
  return (
    <QueryClientProvider client={cli}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ error, resetErrorBoundary }) => (
              <div role="alert">
                <p>에러 발생: {error.message}</p>
                <button onClick={() => resetErrorBoundary()}>다시 시도</button>
              </div>
            )}
          >
            {/* <WithOutReactQueryTestApp></WithOutReactQueryTestApp> */}
            <Suspense fallback={<p>Loading...</p>}>
              <ReactQueryTestApp></ReactQueryTestApp>
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  );
}
