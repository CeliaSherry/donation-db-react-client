import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {REHYDRATE} from 'redux-persist/constants';
import createActionBuffer from 'redux-action-buffer';
import api from './api';
import {routerMiddleware} from 'react-router-redux';
import createHistory from "history/createBrowserHistory";
import { apiMiddleware } from 'redux-api-middleware';


import rootReducer from './reducers/rootReducer';

import { persistStore, persistReducer } from 'redux-persist5';

const middleWares = [
  createActionBuffer(REHYDRATE),
  thunk,
  apiMiddleware,
  routerMiddleware(createHistory()),
];


// export default function configureStore(initialState={}) {
//  return createStore(
//    rootReducer,
//    compose(
//    applyMiddleware(...middleWares),
//    )
//  );
// }


export default function configureStore(initialState={}) {
  return createStore(
    rootReducer,
    applyMiddleware(apiMiddleware, thunk),
  );
 }
