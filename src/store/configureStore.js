import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux'

const reducer = combineReducers({
  ...rootReducer,
  routing: routerReducer
});

export default function configureStore(initialState) {
  const store = createStore(
    reducer, compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
