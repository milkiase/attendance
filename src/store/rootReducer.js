import { combineReducers } from "@reduxjs/toolkit";
import studentsReducer from "./students/studentsSlice";

const rootReducer = combineReducers({
    'students': studentsReducer
})
export default rootReducer