import React, { JSX, useState } from "react";
import { produce } from "immer";

interface TodoListItemType {
  no: number;
  todo: string;
  done: boolean;
}

interface TodoListContextValueType {
  state: { todoList: Array<TodoListItemType> };
  actions: {
    addTodo: (todo: string) => void;
    deleteTodo: (no: number) => void;
    toggleDone: (no: number) => void;
  };
}

const TodoContext = React.createContext<TodoListContextValueType | null>(null);

interface PropsType {
  children: JSX.Element | JSX.Element[];
}

export const TodoProvider = (props: PropsType) => {
  const [todoList, setTodoList] = useState<Array<TodoListItemType>>([
    { no: 1, todo: "react#1", done: true },
    { no: 2, todo: "react#2", done: true },
    { no: 3, todo: "react#3", done: false },
    { no: 4, todo: "react#4", done: false },
  ]);

  const addTodo = (todo: string) => {
    const newTodoList = produce(todoList, (draft: Array<TodoListItemType>) => {
      draft.push({ no: new Date().getTime(), todo: todo, done: false });
    });
    setTodoList(newTodoList);
  };

  const deleteTodo = (no: number) => {
    const index = todoList.findIndex((item) => item.no === no);
    const newTodoList = produce(todoList, (draft: Array<TodoListItemType>) => {
      draft.splice(index, 1);
    });
    setTodoList(newTodoList);
  };

  const toggleDone = (no: number) => {
    const index = todoList.findIndex((item) => item.no === no);
    const newTodoList = produce(todoList, (draft: Array<TodoListItemType>) => {
      draft[index].done = !draft[index].done;
    });
    setTodoList(newTodoList);
  };

  const values: TodoListContextValueType = {
    state: { todoList },
    actions: { addTodo, deleteTodo, toggleDone },
  };

  return (
    <TodoContext.Provider value={values}>{props.children}</TodoContext.Provider>
  );
};

export default TodoContext;
