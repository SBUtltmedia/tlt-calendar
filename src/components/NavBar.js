import { Link } from 'react-router';
import styles from './NavBar.scss';

export default () => (
  <nav className="navbar navbar-default navbar-fixed-top">
    <div className="container">
      <div className="navbar-header">
        <Link className="navbar-brand" to="/">RoboScheduler 3000</Link>
      </div>
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right">
            <li><Link to="/settings">Settings</Link></li>
            <li><Link to="/logout">Logout</Link></li>
        </ul>
      </div>
    </div>
  </nav>
);
