/*
    En una app se puede tener la cantidad que se necesaria
    de reducers, siempre y cuando los combines, es decir,
    que solo tengas 1.
*/

import { combineReducers } from "redux";
import productosReducer from './productosReducer';

export default combineReducers({
    productos: productosReducer
});