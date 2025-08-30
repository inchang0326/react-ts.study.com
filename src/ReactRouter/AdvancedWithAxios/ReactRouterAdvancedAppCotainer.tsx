import "./ReactRouterAdvancedAppCSS.css";
import { produce } from "immer";
import { useEffect, useState } from "react";
import ReactRouterAdvancedApp from "./ReactRouterAdvancedApp";
import axios from "axios";

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

const USER = "gdhong";
const BASE_URI = "/api/todolist_long/" + USER;

/**
 *  전반적인 통신 후처리가 데이터 CUD 후 데이터 R하지 않고 React의 상태로 관리함으로써, 개인화 화면의 경우 캐시 효과로 성능 개선에 도움이 되지만,
 *  만약 여러 사용자의 실시간 데이터 CRUD가 발생하며 데이터의 동시성 및 정합성을 보장하고 화면에서도 표현이 되어야 한다면, 서버 통해 재조회 해야 함
 */
const ReactRouterAdvancedAppContainer = () => {
  // const [todoList, setTodoList] = useState<Array<TodoItemType>>([
  //   { id: 1, todo: "react학습#1", desc: "설명#1", done: true },
  //   { id: 2, todo: "react학습#2", desc: "설명#2", done: true },
  //   { id: 3, todo: "react학습#3", desc: "설명#3", done: false },
  //   { id: 4, todo: "react학습#4", desc: "설명#4", done: false },
  // ]);
  const [todoList, setTodoList] = useState<Array<TodoItemType>>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // 1. useEffect() 내 setState()는 batch 처리 됨
    fetchTodoList();
  }, []);

  const fetchTodoList = async () => {
    setLoading(true); // 2. 하지만 async ~ await 네트워크 처리로 인해, setLoading(true)와 그 이후 setState() 처리는 같은 사이클이 아님
    try {
      const res = await axios.get(BASE_URI);
      setTodoList(res.data);
    } catch (e) {
      if (e instanceof Error) alert("# 조회 실패: " + e.message);
      else alert("# 조회 실패: " + e);
    }
    setLoading(false);
  };

  const addTodo = async (todo: string, desc: string, callback: () => void) => {
    setLoading(true);
    try {
      const res = await axios.post(BASE_URI, { todo, desc });
      if (res.data.status === "success") {
        const newTodoList = produce(todoList, (draft) => {
          draft.push({ ...res.data.item, done: false });
        });
        setTodoList(newTodoList);
        callback();
      } else {
        alert("#할 일 추가 실패:" + res.data.message);
      }
    } catch (e) {
      if (e instanceof Error) alert("# 할 일 추가 실패: " + e.message);
      else alert("# 할 일 추가 실패: " + e);
    }
    setLoading(false);
  };

  const deleteTodo = async (id: number) => {
    try {
      const res = await axios.delete(`${BASE_URI}/${id}`);
      if (res.data.status === "success") {
        const index = todoList.findIndex((todo) => todo.id === id);
        const newTodoList = produce(todoList, (draft) => {
          draft.splice(index, 1);
        });
        setTodoList(newTodoList);
      } else {
        alert("#할 일 삭제 실패:" + res.data.message);
      }
    } catch (e) {
      if (e instanceof Error) alert("# 할 일 삭제 실패: " + e.message);
      else alert("# 할 일 삭제 실패: " + e);
    }
  };

  const toggleDone = async (id: number) => {
    try {
      const todoItem = todoList.find((todo) => todo.id === id);
      const res = await axios.put(`${BASE_URI}/${id}`, {
        ...todoItem,
        done: !todoItem?.done,
      });
      if (res.data.status === "success") {
        const index = todoList.findIndex((todo) => todo.id === id);
        const newTodoList = produce(todoList, (draft: Array<TodoItemType>) => {
          draft[index].done = !draft[index].done;
        });
        setTodoList(newTodoList);
      } else {
        alert("#완료 토글 실패:" + res.data.message);
      }
    } catch (e) {
      if (e instanceof Error) alert("# 완료 토글 실패: " + e.message);
      else alert("# 완료 토글 실패: " + e);
    }
  };

  const updateTodo = async (
    id: number,
    todo: string,
    desc: string,
    done: boolean,
    callback: () => void
  ) => {
    try {
      const res = await axios.put(`${BASE_URI}/${id}`, { todo, desc, done });
      if (res.data.status === "success") {
        const index = todoList.findIndex((todo) => todo.id === id);
        const newTodoList = produce(todoList, (draft) => {
          draft[index] = { ...draft[index], todo, desc, done };
        });
        setTodoList(newTodoList);
        callback();
      } else {
        alert("#할 일 수정 실패:" + res.data.message);
      }
    } catch (e) {
      if (e instanceof Error) alert("# 할 일 수정 실패: " + e.message);
      else alert("# 할 일 수정 실패: " + e);
    }
  };
  /**
   *  상위 컴포넌트에서 상태 관리(lifting state up)
   *  상태 변경 메소드를 하위 컴포넌트로 전달하고, 하위 컴포넌트에서 상위 컴포넌트로 상태 변경 요청함
   */
  const callbacks: CallbacksType = {
    fetchTodoList,
    addTodo,
    deleteTodo,
    toggleDone,
    updateTodo,
  };
  const states: StatesType = { todoList, isLoading };

  return (
    <ReactRouterAdvancedApp
      callbacks={callbacks}
      states={states}
    ></ReactRouterAdvancedApp>
  );
};

export default ReactRouterAdvancedAppContainer;
