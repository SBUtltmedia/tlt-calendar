import styles from './LocationOrder.scss';
import Reorder from 'react-reorder';
import {LOCATIONS} from '../constants/Settings';

const ListItem = ({item}) => (
  <div className="list-item">{item.name}</div>
);

export default ({reorderGlobalLocations}) => (
  <div className={styles.container}>
    <h3>Location Preference Order</h3>
    <Reorder
      // The key of each object in your list to use as the element key
      itemKey='name'
      // Lock horizontal to have a vertical list
      lock='horizontal'
      // The milliseconds to hold an item for before dragging begins
      holdTime='10'
      // The list to display
      list={LOCATIONS}
      // A template to display for each list item
      template={ListItem}
      // Function that is called once a reorder has been performed
      callback={reorderGlobalLocations}
      // The key to compare from the selected item object with each item object
      selectedKey='uuid'
      // Allows reordering to be disabled
      disableReorder={false}/>
  </div>
)