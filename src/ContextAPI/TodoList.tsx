import { useContext, useState } from "react";
import TodoContext from "./TodoContext";
import TodoListItem from "../ClassBasedReactComponents/TodoListApp/TodoListItem";

const TodoList = () => {
  const value = useContext(TodoContext);

  const items = value?.state.todoList.map((item) => {
    return (
      <TodoListItem
        key={item.no}
        todoItem={item}
        deleteTodo={value?.actions.deleteTodo}
        toggleDone={value?.actions.toggleDone}
      ></TodoListItem>
    );
  });

  return (
    <div className="row">
      <div className="col">
        <ul className="list-group">{items}</ul>
      </div>
    </div>
  );
};

export default TodoList;
