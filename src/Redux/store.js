import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers.js/rootreducer';

const middleware = [thunk];

export const store = createStore(
  rootReducer,
 applyMiddleware(...middleware),
);

const stores = {
  store,
};
export default stores;
 