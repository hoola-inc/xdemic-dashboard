/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from "immer";
import {
  ADD_PERSON,
  ADD_PERSONS,
  EDIT_PERSON,
  DELETE_PERSON,
  ACCEPT_PERSON,
  REJECT_PERSON
} from "./constants";

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentPerson: {},
  persons: []
};

/* eslint-disable default-case, no-param-reassign */
const schoolReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_PERSON:
        console.log("case ADD_PERSON data is: ", action);
        draft.currentPerson = action.data;
        break;
      case ADD_PERSONS:
        console.log("case ADD_PERSONS data is: ", action);
        draft.persons = action.data;
        break;
      case EDIT_PERSON:
        console.log("case EDIT_PERSON data is: ", action);
        draft.userData = action.data;
        break;
      case DELETE_PERSON:
        console.log("case DELETE_PERSON data is: ", action);
        draft.userData = action.data;
        break;
      case ACCEPT_PERSON:
        console.log("case ACCEPT_PERSON data is: ", action);
        draft.userData = action.data;
        break;
      case REJECT_PERSON:
        console.log("case REJECT_PERSON data is: ", action);
        draft.userData = action.data;
        break;
    }
  });

export default schoolReducer;
