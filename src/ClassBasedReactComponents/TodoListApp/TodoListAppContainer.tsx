import { produce } from "immer";
import { Component } from "react";
import TodoListApp from "./TodoListApp";
import "./TodoListAppCSS.css";
import "bootstrap/dist/css/bootstrap.css";

type TodoListItemType = {
  no: number;
  todo: string;
  done: boolean;
};

interface TodoListAppContainerProps {}

interface TodoListAppContainerState {
  todoList: Array<TodoListItemType>;
}

export default class TodoListAppContainer extends Component<
  TodoListAppContainerProps,
  TodoListAppContainerState
> {
  state: TodoListAppContainerState = {
    todoList: [
      { no: 1, todo: "react#1", done: true },
      { no: 2, todo: "react#2", done: true },
      { no: 3, todo: "react#3", done: false },
      { no: 4, todo: "react#4", done: false },
    ],
  };

  constructor(props: TodoListAppContainerProps) {
    super(props);
    console.log("TodoListAppContainer Constructor");
  }

  addTodo = (todo: string) => {
    const newTodoList = [...this.state.todoList];
    newTodoList.push({ no: new Date().getTime(), todo: todo, done: false });
    this.setState({ todoList: newTodoList });
  };

  deleteTodo = (no: number) => {
    const index = this.state.todoList.findIndex((todo) => todo.no === no);
    // immer 통한 im-mutablity 구현 방법
    let newTodoList = produce(this.state, (draft) => {
      draft.todoList.splice(index, 1);
    });
    this.setState(newTodoList);
  };

  // todoList가 갱신 되어야 하는 값으로, useCallback 사용하면 안 됨
  toggleDone = (no: number) => {
    const index = this.state.todoList.findIndex((todo) => todo.no === no);
    // immer 통한 im-mutablity 구현 방법
    let newTodoList = produce(this.state, (draft) => {
      draft.todoList[index].done = !draft.todoList[index].done;
    });
    this.setState(newTodoList);
  };

  render() {
    console.log("TodoListAppContainer Rendered");
    return (
      <div>
        <TodoListApp
          todoList={this.state.todoList}
          addTodo={this.addTodo}
          deleteTodo={this.deleteTodo}
          toggleDone={this.toggleDone}
        />
      </div>
    );
  }
}
