/**
 *  (2) Redux의 action에 의한 Reducer 관리 및 Middleware 연동 Store
 */
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import type { Middleware } from "redux";
import TodoReducer from "./TodoReducer";
import TimeReducer from "./TimeReducer";

export type HomeStatesType = { currentTime: string; isChanging: boolean };

export interface TodoItemType {
  id: number;
  todo: string;
  desc: string;
  done: boolean;
}

export interface TodoStatesType {
  todoList: Array<TodoItemType>;
}

export type RootStatesType = {
  home: HomeStatesType;
  todos: TodoStatesType;
};

const RootReducer = combineReducers({ home: TimeReducer, todos: TodoReducer });

/**
 *  Redux Middleware
 *  : action이(객체메시지) store로 전달된(dispatched) 후 reducer로 가기 전, 상태 변경에 따른 수행 작업을 중앙집중화할 수 있도록 함
 *    이를 활용해, store에 redux middleware를 설치하여 비동기 통신, 로깅, 모니터링 등의 다양한 작업을 해줄 수 있음
 *    middleware(store)(next=disaptch())(action) 전처리 => reducer 로직 처리 또는 다른 middleware => middleware 후처리
 *
 *  redux-thunk란, middleware 중 하나로, action을 객체값 대신 함수를 전달받을 수 있도록 하며 해당 함수를 비동기 처리할 수 있도록 해줌
 */

const mw1: Middleware = (store) => (next) => (action) => {
  console.log("### mw1 전");
  next(action);
  console.log("### mw1 후");
};

const mw2: Middleware = (store) => (next) => (action) => {
  console.log("### mw2 전");
  next(action);
  console.log("### mw2 후");
  console.log(store.getState());
};

const consoleLoggerMW: Middleware = (store) => (next) => (action) => {
  console.log(`### action 실행: ${action}`);
  console.log(
    `### action 변경 전 상태: ${JSON.stringify(store.getState(), null, 2)}`
  );
  next(action);
  console.log("### action 변경 후 상태: ", store.getState());
};

const AppStore = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      consoleLoggerMW
    );
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default AppStore;
