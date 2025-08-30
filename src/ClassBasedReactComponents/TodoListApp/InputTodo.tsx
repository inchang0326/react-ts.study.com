import { KeyboardEvent, ChangeEvent, Component } from "react";

interface InputTodoProps {
  addTodo: (todo: string) => void; // memoization으로 인해, 부모 컴포넌트 App의 re-rendering에 따라 re-rendering 되지 않음
}

interface InputTodoState {
  todo: string;
}

export default class InputTodo extends Component<
  InputTodoProps,
  InputTodoState
> {
  state: InputTodoState = { // 단, state를 갖고 있기 때문에 setState() 시엔 re-rendering 함
    todo: "",
  };

  constructor(props: InputTodoProps) {
    super(props);
    console.log("InputTodo Constructor");
  }

  private addHandler = () => {
    this.props.addTodo(this.state.todo);
    this.setState({ todo: "" });
  };

  private enterInput = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      this.addHandler();
    }
  };

  private changeTodo = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ todo: e.target.value });
  };

  render() {
    console.log("InputTodo Rendered");

    return (
      <div className="row">
        <div className="col">
          <div className="input-group">
            <input
              id="msg"
              type="text"
              className="form-control"
              name="msg"
              placeholder="할 일 입력"
              value={this.state.todo}
              onChange={this.changeTodo}
              onKeyUp={this.enterInput}
            />
            <span
              className="btn btn-primary input-group-addon"
              onClick={this.addHandler}
            >
              추가
            </span>
          </div>
        </div>
      </div>
    );
  }
}
