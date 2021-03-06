import { render }  from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import * as reducers from './reducers';
import thunk from 'redux-thunk';
import App from './containers/App';
import HourPreferences from './containers/HourPreferences';
import HourPreferencesList from './containers/HourPreferencesList';
import Dashboard from './containers/Dashboard';
import { SHOW_DEV_TOOLS } from './constants/Settings';

// Exposes React performance profiling tools for use in console
if (process.env.NODE_ENV !== 'production') {
  require('expose-loader?Perf!react-addons-perf');
}

const reducer = combineReducers({
  ...reducers
});

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q" defaultIsVisible={SHOW_DEV_TOOLS}>
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
);

const store = createStore(
  reducer, compose(
    applyMiddleware(thunk),
    //window.devToolsExtension ? window.devToolsExtension() : f => f,
    DevTools.instrument()
  )
);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers', () => {
    const nextReducer = require('../reducers');
    store.replaceReducer(nextReducer);
  });
}

render((
  <Provider store={store}>
    <div>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Dashboard} />
          <Route path="preferences" component={HourPreferencesList} />
          <Route path="preferences/:netId" component={HourPreferences} />
        </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>
),document.getElementById('root'));
