import React, { useContext, useState } from "react";
import TodoContext from "./TodoContext";

const InputTodo = () => {
  const [todo, setTodo] = useState<string>("");
  const value = useContext(TodoContext);

  const addHandler = () => {
    value?.actions.addTodo(todo);
    setTodo("");
  };

  const enterInput = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addHandler();
    }
  };

  const changeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

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
            value={todo}
            onChange={changeTodo}
            onKeyUp={enterInput}
          ></input>
          <span
            className="btn btn-pimary input-group-addon"
            onClick={addHandler}
          >
            추가
          </span>
        </div>
      </div>
    </div>
  );
};

export default InputTodo;
