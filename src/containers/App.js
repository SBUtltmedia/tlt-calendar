import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './App.scss';
import NavBar from '../components/NavBar';
import {fetchEmployees} from '../actions/EmployeesActions';

const App = ({children}) => (
  <div className={styles.container}>
    <NavBar />
    <div className='children'>{children}</div>
  </div>
)

function matchDispatchToProps(dispatch) {
  dispatch(fetchEmployees())
  return {

  };
}

export default connect(
  state => ({}),
  matchDispatchToProps
)(App);
