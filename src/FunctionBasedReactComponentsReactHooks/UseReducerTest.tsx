import { produce } from "immer";

type TodoItemType = {
  id: number;
  todo: string;
};

export const TODO_ACTION = {
  ADD: "ADD" as const,
  DELETE: "DELETE" as const,
};

export const TodoActions = {
  add: (todo: string) => ({
    type: TODO_ACTION.ADD,
    payload: { todo: todo }, // {key: value}
  }),
  delete: (id: number) => ({
    type: TODO_ACTION.DELETE,
    payload: { id: id }, // {key: value}
  }),
};

export type TodoActionType = ReturnType<
  (typeof TodoActions)[keyof typeof TodoActions]
>;

export const reducer = (state: Array<TodoItemType>, action: TodoActionType) => {
  switch (action.type) {
    case TODO_ACTION.ADD:
      return produce(state, (draft: Array<TodoItemType>) => {
        draft.push({ id: new Date().getTime(), todo: action.payload.todo });
      });
    case TODO_ACTION.DELETE:
      let index = state.findIndex((item) => item.id === action.payload.id);
      return produce(state, (draft: Array<TodoItemType>) => {
        draft.splice(index, 1);
      });
    default:
      return state;
  }
};
