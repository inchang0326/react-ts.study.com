import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { ErrorBoundary } from "react-error-boundary";

import Layout from "./Layout";
import Home from "./Home";
import About from "./About";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";
import NotFound from "./NotFound";
import Loading from "./Loading";
import UserInfo from "./UserInfo";
import React from "react";

interface TodoItemType {
  id: number;
  todo: string;
  desc: string;
  done: boolean;
}

interface StatesType {
  todoList: Array<TodoItemType>;
  isLoading: boolean;
}

interface CallbacksType {
  fetchTodoList: () => void;
  addTodo: (todo: string, desc: string, callback: () => void) => void;
  deleteTodo: (id: number) => void;
  toggleDone: (id: number) => void;
  updateTodo: (
    id: number,
    todo: string,
    dsec: string,
    done: boolean,
    callback: () => void
  ) => void;
}

interface ReactRouterAdvancedAppProps {
  states: StatesType;
  callbacks: CallbacksType;
}

const listUrl = "/api/todolist_long/gdhong";
const todoUrlPrefix = "/api/todolist_long/gdhong/";

const requestAPI = () => {
  let todoList: Array<TodoItemType> = [];
  axios
    .get(listUrl)
    .then((response) => {
      todoList = response.data;
      console.log("# TodoList: ", todoList);
      return todoList[0].id;
    })
    .then((id) => {
      return axios.get(todoUrlPrefix + id);
    })
    .then((response) => {
      console.log("## 첫 번째 Todo: ", response.data);
      return todoList[1].id;
    })
    .then((id) => {
      axios.get(todoUrlPrefix + id).then((response) => {
        console.log("## 두 번째 Todo: ", response.data);
      });
    })
    .catch((error) => {
      if (error instanceof Error) console.log(error.message);
      else console.log(error);
    });
};

const requestAPI2 = async () => {
  let todo: TodoItemType;
  let todoList: Array<TodoItemType>;

  let response = await axios.get(listUrl);
  todoList = response.data;
  console.log("#2 TodoList: ", todoList);

  response = await axios.get(todoUrlPrefix + todoList[0].id);
  console.log("##2 첫번 째 Todo: ", response.data);

  response = await axios.get(todoUrlPrefix + todoList[1].id);
  console.log("##2 두번 째 Todo: ", response.data);
};

const requestAPI3 = async () => {
  let todoList: Array<TodoItemType>;
  try {
    let response = await axios.get(listUrl);
    console.log("# 궁금해: ", response.request);
    todoList = response.data;
    console.log("#3 TodoList: ", todoList);
    for (let i = 0; i < todoList.length; i++) {
      response = await axios.get(todoUrlPrefix + todoList[i].id);
      console.log(`## ${i + 1}번째 Todo: `, response.data);
    }
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    else console.log(e);
  }
};

// requestAPI();
// requestAPI2();
// requestAPI3();

const ReactRouterAdvancedApp = ({
  states,
  callbacks,
}: ReactRouterAdvancedAppProps) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route index element={<Home></Home>}></Route>
          <Route path="about" element={<About></About>}></Route>
          <Route
            path="todos"
            element={
              <TodoList states={states} callbacks={callbacks}></TodoList>
            }
          ></Route>
          <Route
            path="todos/add"
            element={<AddTodo callbacks={callbacks}></AddTodo>}
          ></Route>
          <Route
            path="todos/edit/:id"
            element={
              <EditTodo states={states} callbacks={callbacks}></EditTodo>
            }
          ></Route>
          <Route
            path="user"
            element={
              /**
               *  *ErrorBoundary와 React.Suspense는 상호 보완 관계임
               *  [ErrorBoundary]
               *  ErrorBoundary는 "오류 처리" 용도의 Fallback UI를 제공함
               *  ErrorBoundary는 통신 error는 처리되는 듯 한데, 이벤트 error 처리는 근원지에서 패턴 코딩을 해줘야 함
               *  [React.Suspense]
               *  React.Suspense는 "로딩 처리" 용도의 Fallback UI를 제공함
               *  해당 컴포넌트에선 컴포넌트 별 적용 방식으로 사용 했음, 만약 모두 적용하고 싶으면 <Routes /> 상위에 적용할 수 있음
               *  Compoenent lazy loading과 달리, 통신 loading은 React와 Suspense 내부 처리로 Promise 상태 감지 못 함
               *  => axios 등 사용하는 쪽에서 Promise를 반환할 수 있도록 패턴 코딩을 해줘야 함
               */
              <ErrorBoundary fallback={<div>UserInfo 오류 발생</div>}>
                <React.Suspense fallback={<h2>UserInfo 로딩 중</h2>}>
                  <UserInfo></UserInfo>
                </React.Suspense>
              </ErrorBoundary>
            }
          ></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Route>
      </Routes>
      {states.isLoading ? <Loading></Loading> : ""}
    </Router>
  );
};

export default ReactRouterAdvancedApp;
