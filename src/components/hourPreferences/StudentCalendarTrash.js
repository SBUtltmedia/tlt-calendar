import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Trash from '../Trash';
import DraggableTypes from '../../constants/DraggableTypes';
import * as HourPreferencesActions from '../../actions/HourPreferencesActions';


const mapStateToProps = state => ({
  itemTypes: [DraggableTypes.CHIP]
});

const mapDispatchToProps = dispatch => {
  const actions = bindActionCreators(HourPreferencesActions, dispatch);
  return {
    removeItem: actions.removeItem
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trash);
