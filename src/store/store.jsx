/**
 * @file Main store file.
 * @author Alice Klipper <alice.klipper@yandex.com> (https://vk.com/alice.klipper)
 * @license MIT
 * @copyright KlipperSubs, 2017
 * @flow
 */

import { createStore } from 'redux';
import { /* createAction, */ createReducer } from 'redux-act';
// import { over, lensPath } from 'ramda';

// const lensCounter = lensPath(['counter']);

export const reducer = createReducer(
    {
        //
    },
    {
        counter: 0,
    },
);

export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
