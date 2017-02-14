import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Reorder from 'react-reorder';
import styles from './LocationOrder.scss';
import {reorderGlobalLocations} from '../actions/HourPreferencesActions';
import _ from 'lodash';

const ListItem = ({item}) => <div className="list-item">{item.title}</div>;

const LocationOrder = ({locations, reorderGlobalLocations, disabled}) => (
  <div className={`${styles.container}${disabled ? ' disabled' : ''}`}>
    <div className="title">Location Preference Order</div>
    <Reorder
      // The key of each object in your list to use as the element key
      itemKey='id'
      // Lock horizontal to have a vertical list
      lock='horizontal'
      // The milliseconds to hold an item for before dragging begins
      holdTime='10'
      // The list to display
      list={locations}
      // A template to display for each list item
      template={ListItem}
      // Function that is called once a reorder has been performed
      callback={reorderGlobalLocations}
      // The key to compare from the selected item object with each item object
      selectedKey='uuid'
      // Allows reordering to be disabled
      disableReorder={disabled} />
  </div>
)

const getLocationsFromOrder = (state) =>
    _.map(state.hourPreferences.locationOrder,
      id => _.find(state.locations, loc => loc.id === id))

const mapStateToProps = state => ({
  locations: getLocationsFromOrder(state)
});

const mapDispatchToProps = dispatch => {
  function reorderFn(event, itemThatHasBeenMoved, itemsPreviousIndex,
                     itemsNewIndex, reorderedArray) {
    dispatch(reorderGlobalLocations(_.map(reorderedArray, item => item.id)));
  }
  return {
    reorderGlobalLocations: reorderFn
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationOrder);
