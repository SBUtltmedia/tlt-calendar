import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './App.scss';
import NavBar from '../components/NavBar';
import { fetchLocations } from '../actions/LocationsActions';
import { fetchThisUser } from '../actions/UserActions';

class App extends Component {

  componentWillMount() {
    const { fetchThisUser, fetchLocations } = this.props;
    fetchThisUser();
    fetchLocations();
  }

  render() {
    return <div className={styles.container}>
      <NavBar />
      <div className='children'>{this.props.children}</div>
    </div>;
  }
}

export default connect(
  state => ({}),
  {fetchThisUser, fetchLocations}
)(App);
