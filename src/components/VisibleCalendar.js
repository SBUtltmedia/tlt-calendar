import { connect } from 'react-redux';
import Calendar from './Calendar';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    onDateClick: (date) => {
      //dispatch(toggleDate(date))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);
