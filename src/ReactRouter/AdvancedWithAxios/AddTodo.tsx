import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CallbacksType {
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

interface AddTodoProps {
  callbacks: CallbacksType;
}

const AddTodo = ({ callbacks }: AddTodoProps) => {
  const navigate = useNavigate();

  const [todo, setTodo] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const addTodoHandler = () => {
    if (todo.trim() === "" || desc.trim() === "") {
      alert("할 일, 설명을 입력해 주세요.");
      return;
    }
    callbacks.addTodo(todo, desc, () => {
      navigate("/todos");
    });
  };

  return (
    <>
      <div className="row">
        <div className="col p-3">
          <h2>할 일 추가</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="todo">할 일:</label>
            <input
              type="text"
              className="form-control"
              id="todo"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="todo">설명:</label>
            <textarea
              className="form-control"
              rows={3}
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button
              type="button"
              className="btn btn-primary m-1"
              onClick={addTodoHandler}
            >
              추가
            </button>
            <button
              type="button"
              className="btn btn-primary m-1"
              onClick={() => {
                navigate("/todos");
              }}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTodo;
