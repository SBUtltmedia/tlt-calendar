import { render }  from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import * as reducers from './reducers';
import thunk from 'redux-thunk';
import App from './containers/App';
import HourPreferences from './containers/HourPreferences';
import AdminDashboard from './containers/AdminDashboard';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q" defaultIsVisible={false}>
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

const history = syncHistoryWithStore(browserHistory, store);

render((
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={HourPreferences} />
          <Route path="student" component={HourPreferences} />
          <Route path="admin" component={AdminDashboard} />
        </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>
),document.getElementById('root'));
