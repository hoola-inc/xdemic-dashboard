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

import { ADD_SCHOOL } from "./constants";

/**
 *
 * @param  {object} data The data
 *
 * @return {object}       An action object with a type of ADD_ADMIN passing the data
 */

export function addSchool(data) {
  return {
    type: ADD_SCHOOL,
    data
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
