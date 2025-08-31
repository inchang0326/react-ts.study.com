# React.js + TypeScript on Vite

This reposiotry collect study samples all about React.js + TypeScript on Vite

[References]

- <원쌤의 리액트 퀵스타트 with 타입스크립트>
- <모던 리액트 완벽 입문>
- Perflexiry.ai assistance&advice

## Contents

```
1. React.js framework basic grammar with TypeScript language
- variable declare: var, let, const
- template literal
- destructure allocation
- arrow function, nested function, ‘this’ binding
- eventPropagation, preventDefault
- JSX/TSX transfiling
   - babel tool
- Props and State
- Parent, Children
- CSS in React.js
   - CSS import
   - CSS Modules
   - CSS in JS(Styled-component)
   - Utility First CSS
   - CSS Preprocessor
- Type Annotations

2. reusable OOP React Component
- class based react-component & lifecycle of component
   - constructor
   - render
   - componentDidMount / componentWillUnMount
   - shouldComponentUpdate / componentDidUpdate
- improved component: function based react-component

3. React Hooks friendly to function based react-component
- useState
- useEffect
   - state update queue(FIFO) batching: makes rendering just once
- useMemo, useCallback, memo
- useRef
- useTransition, useDeferredValue
- Custom React Hooks
- React Developer Tools(Chrome Extension)

4. SPA(Single Page Application)
- bundling
   - webpack tool
- React Router
- component eager loading / lasy loading

5. CSR(Client Side Rendering) by FE, SSR(Server Side Rendering) by BE
- SEO(Search Engine Optimization) problem
- React Virtual DOM before realistic DOM
- re-rendering philosophy(im-mutablity) & optimization
   - shallow copy + structure sharing: spread operator, immer open module
   - deep copy
   - immutable assist open module

6. Powerful ContextAPI + useReducer

7. Asynchronous HTTP tele-communication
- CORS / Proxy Server for SOP
- AJAX, Fetch, Axios
- async ~ await block
- fallback UI for loading: Spinner, Suspense(embedded component via React)
- fallback UI for error: react-error-boundary

8. High Order Function(like SpringBoot AOP)
- return function
- return component

9. React.js’s data philosophy and architecture: one-way data flow
- props as managed states and callbacks update states tend to flow from superior component to inferior component(updating UI)
- event handled inferior component calls back props(lifting state up), then superior component updates states and props flow again one-way
- In conclusion, one-way data flow can let know where the state is managed and where the state update callbacks are made clearly for DXs

10. Redux open module(a.k.a. Redux Toolkit)
- Action Creator
- Store
   - MiddleWare
      - redux-thunk
      - redux-saga
   - Redux DevTools(Chrome Extension)
- Reducer

Plus. Free Hosting
- WS for static resource: Vercel
- WAS for dynamic resource: Render
- DB Server: Render
- Remote Repository: Github and CI/CD(to be triggered)

Plus. Storybook
- provides isolated component info on web(similar to API docs but passive..)

Plus. PWA란?
- Web(정적 웹) > Native App > Web-app(동적 웹) > Hibrid-app(Web-view based), SPA 등 > PWA(Progressive Web App)으로 발전해 왔으며,
- Web의 배포와 링크 등 강점을 갖고, Native App의 설치, 오프라인/불안정 네트워크에서의 신뢰, PUSH 알림 등 강점까지 내포하는 Native App 같은 Web을 목표함
- 구현을 위해선 Service Worker와 Web App Manifest, HTTPS(TLS) 사용이 필수이며, 그 외 React.js / Vue.js 등 프론트엔드 기술엔 제약이 없음

*More driven by AI advice.
- React Query: Powerful HTTP tool(fetch, Axios) wrapping library handling on cache, synchronization, loading, error, etc ..
- Recoil open module
   - Atom(store)
   - useReocilState, .. (setter)
   - Selector(processor&getter + setter)
- more about TypeScript
- TDD
- Next.js
```
