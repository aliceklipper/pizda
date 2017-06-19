/**
 * @flow
 */

import { createStore } from 'redux';
import { createAction, createReducer } from 'redux-act';
import { over, lensPath } from 'ramda';

const lensCounter = lensPath(['counter']);

export const increment = createAction('Increment the state.');
export const decrement = createAction('Decrement the state.');

export const reducer = createReducer(
    {
        [increment]: state => over(lensCounter, _ + 1, state),
        [decrement]: state => over(lensCounter, _ - 1, state),
    },
    {
        counter: 0,
    },
);

export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

increment.assignTo(store);
decrement.assignTo(store);

export default store;
