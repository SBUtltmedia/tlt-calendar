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
    removeItem: _.bind(actions.removeItem, {}, ownProps.location)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trash);
