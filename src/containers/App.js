import { Component } from 'react';
import { connect } from 'react-redux';
import styles from './App.scss';
import { fetchSchedules } from '../actions/ScheduleActions';

class App extends Component {
  componentWillMount() {
    const {fetchSchedules} = this.props;
    fetchSchedules();
  }

  render() {
    const {children} = this.props;
    return <div className={styles.container}>
      {children}
    </div>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSchedules: () => dispatch(fetchSchedules())
  }
};

export default connect(
  state => ({}),
  mapDispatchToProps
)(App);
