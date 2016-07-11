import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Trash from '../Trash';
import _ from 'lodash';
import DraggableTypes from '../../constants/DraggableTypes';
import * as ScheduleActions from '../../actions/ScheduleActions';

const mapStateToProps = state => ({
  itemTypes: [DraggableTypes.RESERVE, DraggableTypes.EMPLOYEE]
});

const mapDispatchToProps = dispatch => {
  const scheduleActions = bindActionCreators(ScheduleActions, dispatch);
  return {
    removeItem: scheduleActions.removeItem
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trash);
