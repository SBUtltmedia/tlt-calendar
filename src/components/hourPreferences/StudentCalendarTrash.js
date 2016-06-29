import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Trash from '../Trash';
import ItemTypes from '../../constants/ItemTypes';
import * as HourPreferencesActions from '../../actions/HourPreferencesActions';

const mapStateToProps = state => ({
  items: state.hourPreferences.chipsPlaced,
  itemTypes: ItemTypes.CHIP
});

const mapDispatchToProps = dispatch => {
  const actions = bindActionCreators(HourPreferencesActions, dispatch);
  return {
    placeItem: actions.placeChip,
    removeItem: actions.removeChip
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trash);
