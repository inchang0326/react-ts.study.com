import { Link } from "react-router-dom";
import type { Dispatch, AnyAction } from "redux";
import { connect, useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import TodoActionCreator from "./TodoActionCreator";

export type HomeStatesType = { currentTime: string };

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

interface TodoListProps {
  todoList: Array<TodoItemType>;
  deleteTodo: (id: number) => void;
  toggleDone: (id: number) => void;
}

export interface TodoStatesType {
  todoList: Array<TodoItemType>;
}

const TodoList = ({ todoList, deleteTodo, toggleDone }: TodoListProps) => {
  const todoItems = todoList.map((item) => {
    return (
      <TodoItem
        key={item.id}
        todoItem={item}
        deleteTodo={deleteTodo}
        toggleDone={toggleDone}
      ></TodoItem>
    );
  });
  return (
    <>
      <div className="row">
        <div className="col p-3">
          <Link className="btn btn-primary" to="/todos/add">
            할 일 추가
          </Link>
        </div>
        <div className="row">
          <div className="col">
            <ul className="list-group">{todoItems}</ul>
          </div>
        </div>
      </div>
    </>
  );
};

const TodoListContainer = () => {
  const dispatch = useDispatch();

  const todoList = useSelector((state: RootStatesType) => state.todos.todoList);
  const deleteTodo = (id: number) =>
    dispatch(TodoActionCreator.deleteTodo({ id }));
  const toggleDone = (id: number) =>
    dispatch(TodoActionCreator.toggleDone({ id }));

  return (
    <TodoList
      todoList={todoList}
      deleteTodo={deleteTodo}
      toggleDone={toggleDone}
    ></TodoList>
  );
};

export default TodoListContainer;

// const mapStateToProps = (state: RootStatesType) => ({
//   todoList: state.todos.todoList,
// });

// const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
//   deleteTodo: (id: number) => dispatch(TodoActionCreator.deleteTodo({ id })),
//   toggleDone: (id: number) => dispatch(TodoActionCreator.toggleDone({ id })),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
