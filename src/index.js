import { render }  from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
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
import AdminTable from './containers/AdminTable';
import SchedulePage from './containers/SchedulePage';
import SchedulesPage from './containers/SchedulesPage';
import SlotsPage from './containers/SlotsPage';
import SettingsPage from './containers/SettingsPage';
import { SHOW_DEV_TOOLS } from './constants/Settings';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
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

const history = syncHistoryWithStore(hashHistory, store);

render((
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Dashboard} />
          <Route path="preferences" component={HourPreferencesList} />
          <Route path="preferences/:id" component={HourPreferences} />
          <Route path="schedules" component={SchedulesPage} />
          <Route path="schedules/:location" component={SchedulePage} />
          <Route path="slots" component={SlotsPage} />
          <Route path="slots/:location" component={SlotPage} />
          <Route path="settings" component={SettingsPage} />
          <Route path="admin/table" component={AdminTable} />
        </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>
),document.getElementById('root'));
