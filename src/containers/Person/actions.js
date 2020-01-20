/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { ADD_PERSON } from "./constants";
import HS from "../../services/HttpService";

/**
 *
 * @param  {object} data The data
 * @return  {object} ADD_ADMIN An action object with a type of ADD_ADMIN passing the data
 *
 */

export function addPerson(data) {
  return {
    type: ADD_PERSON,
    data
  };
}

/**
 *
 * @param  {object} data The data of new person
 * @return  {object} An action creator
 *
 */

export function addNewPerson(data) {
  console.log("addNewPerson is calling with data is: ", data);
  return function(dispatch) {
    return HS.post("persons", data).then(res => {
      console.log("add new person response is: ", res);
      dispatch(addPerson(data));
    });
  };
}

export function fetchPerson(personDid) {
  console.log("fetchPerson person Did is: ", personDid);
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  return function(dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    // dispatch(requestPosts(personDid));

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.
    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
    return fetch(`https://www.reddit.com/r/${personDid}.json`)
      .then(
        response => response.json(),

        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => console.log("An error occurred.", error)
      )
      .then(json => {
        console.log("calling fetchPosts then 2");
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        // dispatch(receivePosts(personDid, json))
      });
  };
}

// export function fetchProducts() {
//     return dispatch => {
//         dispatch(fetchProductsPending());
//         fetch('https://exampleapi.com/products')
//         .then(res => res.json())
//         .then(res => {
//             if(res.error) {
//                 throw(res.error);
//             }
//             dispatch(fetchProductsSuccess(res.products);
//             return res.products;
//         })
//         .catch(error => {
//             dispatch(fetchProductsError(error));
//         })
//     }
// }
