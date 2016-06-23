import { render }  from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { HourPreferences } from './containers/HourPreferences';
import { AdminDashboard } from './containers/AdminDashboard';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={HourPreferences} />
        <Route path="student" component={HourPreferences} />
        <Route path="admin" component={AdminDashboard} />
      </Route>
    </Router>
  </Provider>
),document.getElementById('root'));
