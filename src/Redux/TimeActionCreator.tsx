/**
 *  (1) Redux의 Store로 dispatch하는 액션 생성자
 */
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import * as DateAndTime from "date-and-time";

const timeout = (delayTime: number) =>
  new Promise((resolve) => setTimeout(resolve, delayTime));

const TimeActionCreator = {
  asyncChangeTime: createAsyncThunk(
    "changeTime",
    /**
     *  액션 생성자는 액션 생성만 담당해야 하는데, redux-thunk 통해 비동기 처리 하면서 side-effect 처리까지 담당해야하는 복잡성이 발생함
     *  => 이를 극복하고, 비동기 처리를 분리해서 좀 더 중점적으로 관리하고 싶다면, redux-saga임. saga는 그 saga 패턴의 saga가 맞음.
     */
    async (undefined, thunkAPI) => {
      // Promise 기반의 payloadCreator
      await timeout(4000);
      return { currentTime: DateAndTime.format(new Date(), "HH시 mm분 ss초") };
    }
  ),
};

export default TimeActionCreator;
