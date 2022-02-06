import {createStore, combineReducers, applyMiddleware}  from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import productReducer from './reducers/productReducer';

const rootReducers = combineReducers({userReducer, productReducer});
export const store = createStore(rootReducers, applyMiddleware(thunk));