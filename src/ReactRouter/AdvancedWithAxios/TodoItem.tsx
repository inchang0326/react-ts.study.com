import { useNavigate } from "react-router-dom";

interface TodoItemType {
  id: number;
  todo: string;
  desc: string;
  done: boolean;
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

interface TodoItemProps {
  todoItem: TodoItemType;
  callbacks: CallbacksType;
}

const TodoItem = ({ todoItem, callbacks }: TodoItemProps) => {
  const navigate = useNavigate();
  let itemClassName = "list-group-item";
  if (todoItem.done) itemClassName += " list-group-item-success";

  return (
    <li className={itemClassName}>
      <span
        className={todoItem.done ? "todo-done pointer" : "pointer"}
        onClick={() => {
          callbacks.toggleDone(todoItem.id);
        }}
      >
        {todoItem.todo} {todoItem.done ? "(완료)" : ""}
      </span>
      <span
        className="float-end badge bg-secondary pointer m-1"
        onClick={() => navigate(`/todos/edit/${todoItem.id}`)}
      >
        편집
      </span>
      <span
        className="float-end badge bg-secondary pointer m-1"
        onClick={() => callbacks.deleteTodo(todoItem.id)}
      >
        삭제
      </span>
    </li>
  );
};

export default TodoItem;
