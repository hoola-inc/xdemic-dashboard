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

export const ADD_SCHOOL = "xDemicDashboard/School/ADD_SCHOOL";
export const EDIT_SCHOOL = "xDemicDashboard/School/EDIT_SCHOOL";
export const DELETE_SCHOOL = "xDemicDashboard/School/DELETE_SCHOOL";
export const ACCEPT_SCHOOL = "xDemicDashboard/School/ACCEPT_SCHOOL";
export const REJECT_SCHOOL = "xDemicDashboard/School/REJECT_SCHOOL";
