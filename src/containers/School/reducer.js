/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from "immer";
import { ADD_SCHOOL } from "./constants";

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentSchool: {}
};

/* eslint-disable default-case, no-param-reassign */
const schoolReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_SCHOOL:
        console.log("case ADD_ADMIN data is: ", action);
        draft.userData = action.data;
        break;
    }
  });

export default schoolReducer;
