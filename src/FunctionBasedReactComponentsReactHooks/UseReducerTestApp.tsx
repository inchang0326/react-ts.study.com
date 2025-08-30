import { useReducer, useState, useMemo } from "react";
import { TodoActions, reducer } from "./UseReducerTest";

type TodoItemType = { id: number; todo: string };

const idNow = new Date().getTime();

const initialTodoList: Array<TodoItemType> = [
  { id: idNow, todo: "excercise" },
  { id: idNow + 1, todo: "reading books" },
  { id: idNow + 2, todo: "listening music" },
];

const UseReducerTestApp = () => {
  const [todoList, dispatch] = useReducer(reducer, initialTodoList);
  const [todo, setTodo] = useState("");
  const addTodo = () => {
    dispatch(TodoActions.add(todo));
    setTodo("");
  };
  const deleteTodo = (id: number) => {
    dispatch(TodoActions.delete(id));
  };

  // useMemo 통한 re-rendering 최적화
  const getTodoListCount = useMemo(() => {
    console.log("## TodoList Count: ", todoList.length);
    return todoList.length;
  }, [todoList.length]);

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      ></input>
      <button onClick={addTodo}>할 일 추가</button>
      <ul>
        {todoList.map((item) => (
          <li key={item.id}>
            {" "}
            {item.todo} &nbsp;&nbsp;
            <button onClick={() => deleteTodo(item.id)}>삭제</button>
          </li>
        ))}
      </ul>
      <div>todo 개수: {getTodoListCount}</div>
    </div>
  );
};

export default UseReducerTestApp;
