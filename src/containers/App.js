import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './App.scss';
import NavBar from '../components/NavBar';
import { fetchEmployees } from '../actions/EmployeesActions';
import { fetchLocations } from '../actions/LocationsActions';

class App extends Component {
  componentDidMount() {
    const { fetchEmployees, fetchLocations } = this.props;
    fetchEmployees();
    fetchLocations();
  }
  render() {
    return <div className={styles.container}>
      <NavBar />
      <div className='children'>{this.props.children}</div>
    </div>;
  }
}

const matchDispatchToProps = dispatch => ({
  fetchEmployees: () => dispatch(fetchEmployees()),
  fetchLocations: () => dispatch(fetchLocations())
});

export default connect(
  state => ({}),
  matchDispatchToProps
)(App);
