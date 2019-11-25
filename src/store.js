import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import rootReducer from './reducers/rootReducer';


export default function configureStore(initialState={}) {
  return createStore(
    rootReducer,
    applyMiddleware(apiMiddleware, thunk),
  );
 }
