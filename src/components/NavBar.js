import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './NavBar.scss';

const renderLoggedInMenu = () => (
  <ul className="nav navbar-nav navbar-right">
    <li><Link to="/settings">Settings</Link></li>
    <li><Link to="/logout">Logout</Link></li>
  </ul>
);

const renderNotLoggedInMenu = () => (
  <ul className="nav navbar-nav navbar-right">
    <li><Link to="/login">Login</Link></li>
  </ul>
);

const NavBar = ({loggedIn, user}) => (
  <nav className="navbar navbar-default navbar-fixed-top">
    <div className="container">
      <div className="navbar-header">
        <Link className="navbar-brand" to="/">RoboScheduler 3000</Link>
      </div>
      <div id="navbar" className="navbar-collapse collapse">
        {loggedIn ? renderLoggedInMenu() : renderNotLoggedInMenu()}
      </div>
    </div>
  </nav>
);

const mapStateToProps = state => ({
  user: state.user,
  loggedIn: !!state.user
});

export default connect(
  mapStateToProps,
  {}
)(NavBar);
