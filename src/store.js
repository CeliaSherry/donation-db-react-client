import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';


import rootReducer from './reducers/rootReducer';

import { persistStore, persistReducer } from 'redux-persist5';


export default function configureStore(initialState={}) {
  return createStore(
    rootReducer,
    applyMiddleware(apiMiddleware, thunk),
  );
 }
