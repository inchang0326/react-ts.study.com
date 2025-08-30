import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TodoActionCreator from "./TodoActionCreator";
import type { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";

export type HomeStatesType = { currentTime: string; isChanging: boolean };

interface TodoItemType {
  id: number;
  todo: string;
  desc: string;
  done: boolean;
}

export interface TodoStatesType {
  todoList: Array<TodoItemType>;
}

export type RootStatesType = {
  home: HomeStatesType;
  todos: TodoStatesType;
};

interface EditTodoProps {
  todoList: Array<TodoItemType>;
  updateTodo: (id: number, todo: string, dsec: string, done: boolean) => void;
}

type TodoParamType = {
  id?: string;
};

const EditTodo = ({ todoList, updateTodo }: EditTodoProps) => {
  const navigate = useNavigate();
  const { id } = useParams<TodoParamType>();
  const todoItem = todoList.find((item) => item.id === parseInt(id ? id : "0"));
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
    updateTodo(id, todo, desc, done);
    navigate("/todos");
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

const mapStateToProps = (state: RootStatesType) => ({
  todoList: state.todos.todoList,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  updateTodo: (id: number, todo: string, desc: string, done: boolean) =>
    dispatch(TodoActionCreator.updateTodo({ id, todo, desc, done })),
});

const EditTodoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTodo);

export default EditTodoContainer;
