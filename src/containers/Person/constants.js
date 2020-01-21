/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const ADD_PERSON = "xDemicDashboard/Person/ADD_PERSON";
export const ADD_PERSONS = "xDemicDashboard/Person/ADD_PERSONS";
export const EDIT_PERSON = "xDemicDashboard/Person/EDIT_PERSON";
export const DELETE_PERSON = "xDemicDashboard/Person/DELETE_PERSON";
export const ACCEPT_PERSON = "xDemicDashboard/Person/ACCEPT_PERSON";
export const REJECT_PERSON = "xDemicDashboard/Person/REJECT_PERSON";
export const SET_PRIVILEGE_PERSON =
  "xDemicDashboard/PersonSET_PRIVILEGE_PERSON/SET_PRIVILEGE_PERSON";
