import ReactDom  from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HourPreferences from './HourPreferences';
import styles from './App.scss';

class App extends React.Component {

  componentWillMount() {
    const { dispatch } = this.props;
    //this.actions = bindActionCreators(Actions, dispatch);
  }

  render() {
    const {  } = this.props;
    return <div className={styles.container}>
      <HourPreferences />
    </div>;
  }
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(App);
