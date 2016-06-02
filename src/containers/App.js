import ReactDom  from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Calendar from '../components/Calendar';

class App extends React.Component {

  componentWillMount() {
    const { dispatch } = this.props;
    //this.actions = bindActionCreators(Actions, dispatch);
  }

  render() {
    const {  } = this.props;
    return <div>
      <Calendar />
    </div>;
  }
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(App);
