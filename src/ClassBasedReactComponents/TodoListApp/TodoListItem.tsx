import { Component, PureComponent } from "react";

type TodoListItemType = {
  no: number;
  todo: string;
  done: boolean;
};

interface TodoListItemProps {
  todoItem: TodoListItemType; // todoItem은 primitive 타입 값들로, 부모 컴포넌트 memoization 없이, 자식 컴포넌트의 memo 만으로 re-rendering을 스킵함(React의 내장 최적화)
  toggleDone: (no: number) => void; // class based react-component에선 toggleDone 멤버 함수가 부모 컴포넌트의 re-rendering에 따라 재생성 되지 않기 때문에, 얕은 비교 시 re-rendering을 스킵함
  deleteTodo: (no: number) => void; // class based react-component에선 deleteTodo 멤버 함수가 부모 컴포넌트의 re-rendering에 따라 재생성 되지 않기 때문에, 얕은 비교 시 re-rendering을 스킵함
}

interface TodoListItemState {}

export default class TodoListItem extends PureComponent<
  TodoListItemProps,
  TodoListItemState
> {
  private itemClassName: string = "list-group-item";

  constructor(props: TodoListItemProps) {
    super(props);
    console.log(`TodoListItem Constructor: ${this.props.todoItem.no}`);
    if (props.todoItem.done) this.itemClassName += " list-group-item-success";
  }

  // => React.Component > React.PureComponet로 대체 가능함
  // shouldComponentUpdate(
  //   nextProps: Readonly<TodoListItemProps>,
  //   nextState: Readonly<TodoListItemState>,
  //   nextContext: any
  // ): boolean {
  //   if (nextProps.todoItem !== this.props.todoItem) return true;
  //   return false;
  // }

  render() {
    console.log(`TodoListItem Rendered: ${this.props.todoItem.no}`);

    return (
      <li className={this.itemClassName}>
        <span
          className={this.props.todoItem.done ? "todo-done pointer" : "pointer"}
          onClick={() => this.props.toggleDone(this.props.todoItem.no)}
        >
          {this.props.todoItem.todo} {this.props.todoItem.done ? " (완료)" : ""}
        </span>
        <span
          className="float-end badge bg-secondary pointer"
          onClick={() => this.props.deleteTodo(this.props.todoItem.no)}
        >
          삭제
        </span>
      </li>
    );
  }
}
