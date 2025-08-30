import { createReducer } from "@reduxjs/toolkit";
import TodoActionCreator from "./TodoActionCreator";
// import { TODO_ACTION } from "./TodoActionCreator";

// const TodoActionCreator = {
//   addTodo: (todoItem: { todo: string; desc: string }) => {
//     return { type: TODO_ACTION.ADD_TODO, payload: todoItem };
//   },
//   deleteTodo: (todoItem: { id: number }) => {
//     return { type: TODO_ACTION.DELETE_TODO, payload: todoItem };
//   },
//   toggleDone: (todoItem: { id: number }) => {
//     return { type: TODO_ACTION.TOGGLE_DONE, payload: todoItem };
//   },
//   updateTodo: (todoItem: {
//     id: number;
//     todo: string;
//     desc: string;
//     done: boolean;
//   }) => {
//     return { type: TODO_ACTION.UPDATE_TODO, payload: todoItem };
//   },
// };

// export type TodoActionType = ReturnType<
//   (typeof TodoActionCreator)[keyof typeof TodoActionCreator]
// >;
// export type TodoActionType =
//   | ReturnType<typeof TodoActionCreator.addTodo>
//   | ReturnType<typeof TodoActionCreator.deleteTodo>
//   | ReturnType<typeof TodoActionCreator.toggleDone>
//   | ReturnType<typeof TodoActionCreator.updateTodo>;

export interface TodoItemType {
  id: number;
  todo: string;
  desc: string;
  done: boolean;
}

export interface TodoStatesType {
  todoList: Array<TodoItemType>;
}

const initialState: TodoStatesType = {
  todoList: [
    { id: 1, todo: "react학습#1", desc: "설명#1", done: true },
    { id: 2, todo: "react학습#2", desc: "설명#2", done: true },
    { id: 3, todo: "react학습#3", desc: "설명#3", done: true },
    { id: 4, todo: "react학습#4", desc: "설명#4", done: false },
  ],
};

// const TodoReducer = (
//   state: TodoStatesType = initialState,
//   action: TodoActionType
// ) => {
//   let index: number;
//   switch (action.type) {
//     case TODO_ACTION.ADD_TODO:
//       return produce(state, (draft) => {
//         draft.todoList.push({
//           id: new Date().getTime(),
//           todo: action.payload.todo,
//           desc: action.payload.desc,
//           done: false,
//         });
//       });
//     case TODO_ACTION.DELETE_TODO:
//       index = state.todoList.findIndex((item) => item.id === action.payload.id);
//       return produce(state, (draft) => {
//         draft.todoList.splice(index, 1);
//       });
//     case TODO_ACTION.TOGGLE_DONE:
//       index = state.todoList.findIndex((item) => item.id === action.payload.id);
//       return produce(state, (draft) => {
//         draft.todoList[index].done = !draft.todoList[index].done;
//       });
//     case TODO_ACTION.UPDATE_TODO:
//       index = state.todoList.findIndex((item) => item.id === action.payload.id);
//       return produce(state, (draft) => {
//         draft.todoList[index] = { ...action.payload };
//       });
//     default:
//       return state;
//   }
// };

const TodoReducer = createReducer(initialState, (builder) => {
  // builder: 리듀서 기능을 만들어주는 빌더 콜백 함수
  //
  builder
    .addCase(TodoActionCreator.addTodo, (state, action) => {
      state.todoList.push({
        id: new Date().getTime(),
        todo: action.payload.todo,
        desc: action.payload.desc,
        done: false,
      });
    })
    .addCase(TodoActionCreator.deleteTodo, (state, action) => {
      const index = state.todoList.findIndex(
        (item) => item.id === action.payload.id
      );
      state.todoList.splice(index, 1);
    })
    .addCase(TodoActionCreator.toggleDone, (state, action) => {
      const index = state.todoList.findIndex(
        (item) => item.id === action.payload.id
      );
      state.todoList[index].done = !state.todoList[index].done;
    })
    .addCase(TodoActionCreator.updateTodo, (state, action) => {
      const index = state.todoList.findIndex(
        (item) => item.id === action.payload.id
      );
      state.todoList[index] = { ...action.payload };
    });
});

export default TodoReducer;
