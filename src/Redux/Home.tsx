import MyTime from "./MyTime";
import TimeActionCreator from "./TimeActionCreator";
import { connect } from "react-redux";
import type { ThunkDispatch } from "redux-thunk";
import type { Dispatch, AnyAction } from "redux";

export type HomeStatesType = { currentTime: string; isChanging: boolean };

export interface TodoItemType {
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

interface HomeProps {
  currentTime: string;
  changeTime: (currentTime: string) => void;
  isChanging: boolean;
}

const Home = ({ currentTime, changeTime, isChanging }: HomeProps) => {
  console.log("Home Rendering");
  return (
    <div className="card card-body">
      <h2>Home</h2>
      {isChanging ? (
        <h4>시간 확인 중..</h4>
      ) : (
        <MyTime currentTime={currentTime} changeTime={changeTime}></MyTime>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootStatesType) => ({
  currentTime: state.home.currentTime,
  isChanging: state.home.isChanging,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>) => ({
  changeTime: () => dispatch(TimeActionCreator.asyncChangeTime()),
});

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer;
