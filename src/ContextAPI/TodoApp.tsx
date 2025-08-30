import InputTodo from "./InputTodo";
import TodoList from "./TodoList";
import { TodoProvider } from "./TodoContext";

const TodoApp = () => {
  return (
    <TodoProvider>
      <div className="container">
        <div className="card card-body bg-light">
          <div className="title">:: TodoList App</div>
        </div>
        <div className="card card-default card-borderless">
          <div className="card-body">
            <InputTodo></InputTodo>
            <TodoList></TodoList>
          </div>
        </div>
      </div>
    </TodoProvider>
  );
};

export default TodoApp;
