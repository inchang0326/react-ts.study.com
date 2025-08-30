/**
 *  (3)
 */
import { createReducer } from "@reduxjs/toolkit";
import TimeActionCreator from "./TimeActionCreator";
import * as DateAndTime from "date-and-time";

export type HomeStatesType = { currentTime: string; isChanging: boolean };

const initialState: HomeStatesType = {
  currentTime: DateAndTime.format(new Date(), "HH시 mm분 ss초"),
  isChanging: false,
};

const TimeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(TimeActionCreator.asyncChangeTime.pending, (state, action) => {
      state.isChanging = true;
    })
    .addCase(TimeActionCreator.asyncChangeTime.fulfilled, (state, action) => {
      state.currentTime = action.payload.currentTime;
      state.isChanging = false;
    });
});

export default TimeReducer;
