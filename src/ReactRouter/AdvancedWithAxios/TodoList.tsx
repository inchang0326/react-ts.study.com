import { Link } from "react-router-dom";
import TodoItem from "./TodoItem";

interface TodoItemType {
  id: number;
  todo: string;
  desc: string;
  done: boolean;
}

interface StatesType {
  todoList: Array<TodoItemType>;
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

interface TodoListProps {
  states: StatesType;
  callbacks: CallbacksType;
}

const TodoList = ({ states, callbacks }: TodoListProps) => {
  const todoItems = states.todoList.map((item) => {
    return (
      <TodoItem key={item.id} todoItem={item} callbacks={callbacks}></TodoItem>
    );
  });
  return (
    <>
      <div className="row">
        <div className="col p-3">
          <Link className="btn btn-primary" to="/todos/add">
            할 일 추가
          </Link>
          <button
            className="btn btn-primary ms-1"
            onClick={() => {
              callbacks.fetchTodoList();
            }}
          >
            할 일 목록 새로고침
          </button>
        </div>
        <div className="row">
          <div className="col">
            <ul className="list-group">{todoItems}</ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
