import { Component } from "react";
import InputTodo from "./InputTodo";
import TodoList from "./TodoList";

type TodoListItemType = {
  no: number;
  todo: string;
  done: boolean;
};

interface TodoListAppProps {
  todoList: Array<TodoListItemType>; // todoList props는 갱신되는 값으로, App 컴포넌트는 re-rendering 되는게 맞음
  addTodo: (todo: string) => void;
  deleteTodo: (no: number) => void; // useCallback의 memoization을 하지 않아서 App 컴포넌트는 re-rendering 되는게 맞음
  toggleDone: (no: number) => void; // useCallback의 memoization을 하지 않아서 App 컴포넌트는 re-rendering 되는게 맞음
}

interface TodoListAppState {}

export default class TodoListApp extends Component<
  TodoListAppProps,
  TodoListAppState
> {
  constructor(props: TodoListAppProps) {
    super(props);
    console.log("TodoListApp Constructor");
  }

  render() {
    console.log("TodoListApp Rendered");

    return (
      <div className="container">
        <div className="card card-body bg-light">
          <div className="title">:: Todolist App</div>
        </div>
        <div className="card card-default card-borderless">
          <div className="card-body">
            <InputTodo addTodo={this.props.addTodo} />
            <TodoList
              todoList={this.props.todoList}
              toggleDone={this.props.toggleDone}
              deleteTodo={this.props.deleteTodo}
            />
          </div>
        </div>
      </div>
    );
  }
}
