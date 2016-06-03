import ReactDom  from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VisibleCalendar from '../components/VisibleCalendar';

class App extends React.Component {

  componentWillMount() {
    const { dispatch } = this.props;
    //this.actions = bindActionCreators(Actions, dispatch);
  }

  render() {
    const {  } = this.props;
    return <div>
      <VisibleCalendar />
    </div>;
  }
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(App);
