import { Component } from "react";
import TodoListItem from "./TodoListItem";

type TodoListItemType = {
  no: number;
  todo: string;
  done: boolean;
};

interface TodoListProps {
  todoList: Array<TodoListItemType>; // todoList props는 갱신되는 값으로, TodoList 컴포넌트는 re-rendering 되는게 맞음
  deleteTodo: (no: number) => void; // useCallback의 memoization을 하지 않아서 TodoList 컴포넌트는 re-rendering 되는게 맞음
  toggleDone: (no: number) => void; // useCallback의 memoization을 하지 않아서 TodoList 컴포넌트는 re-rendering 되는게 맞음
}

interface TodoListState {}

export default class TodoList extends Component<TodoListProps, TodoListState> {
  constructor(props: TodoListProps) {
    super(props);
    console.log("TodoList Constructor");
  }

  // shouldComponentUpdate(
  //   nextProps: Readonly<TodoListProps>,
  //   nextState: Readonly<TodoListState>,
  //   nextContext: any
  // ): boolean {
  //   if (nextProps.todoList !== this.props.todoList) return true;
  //   return false;
  // }

  render() {
    console.log("TodoList Rendered");

    const items = this.props.todoList.map((item) => (
      <TodoListItem
        key={item.no}
        todoItem={item}
        deleteTodo={this.props.deleteTodo}
        toggleDone={this.props.toggleDone}
      />
    ));

    return (
      <div className="row">
        <div className="col">
          <ul className="list-group">{items}</ul>
        </div>
      </div>
    );
  }
}
