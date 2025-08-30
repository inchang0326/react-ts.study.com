import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

interface EditTodoProps {
  states: StatesType;
  callbacks: CallbacksType;
}

type TodoParamType = {
  id?: string;
};

const EditTodo = ({ states, callbacks }: EditTodoProps) => {
  const navigate = useNavigate();
  const { id } = useParams<TodoParamType>();
  const todoItem = states.todoList.find(
    (item) => item.id === parseInt(id ? id : "0")
  );
  if (!todoItem) {
    navigate("/todos");
    return <></>;
  }
  const [todoOne, setTodoOne] = useState<TodoItemType>({ ...todoItem });

  const updatedTodoHandler = () => {
    if (todoOne.todo.trim() === "" || todoOne.desc.trim() === "") {
      alert("할 일, 설명을 입력해 주세요.");
      return;
    }
    const { id, todo, desc, done } = todoOne;
    callbacks.updateTodo(id, todo, desc, done, () => {
      navigate("/todos");
    });
  };

  return (
    <>
      <div className="row">
        <div className="col p-3">
          <h2>할 일 수정</h2>
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
              value={todoOne.todo}
              onChange={(e) => setTodoOne({ ...todoOne, todo: e.target.value })}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="todo">설명:</label>
            <textarea
              className="form-control"
              rows={3}
              id="desc"
              value={todoOne.desc}
              onChange={(e) => setTodoOne({ ...todoOne, desc: e.target.value })}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="todo">완료여부:</label>
            <input
              type="checkbox"
              checked={todoOne.done}
              onChange={(e) =>
                setTodoOne({ ...todoOne, done: e.target.checked })
              }
            ></input>
          </div>
          <div className="form-group">
            <button
              type="button"
              className="btn btn-primary m-1"
              onClick={updatedTodoHandler}
            >
              수정
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

export default EditTodo;
