import { RECEIVE_SCHEDULE, PLACE_ITEM, REMOVE_ITEM, RESIZE_ITEM, MOVE_ITEM } from '../constants/ActionTypes';
import * as calendar from '../utils/calendar';
import { placeItem } from '../utils/schedule';
import moment from 'moment';

const initialState = {
  shifts: [
		{id: 1, group: 1, title: 'item 1', start_time: moment(), end_time: moment().add(1, 'hour'), },
	  {id: 2, group: 2, title: 'item 2', start_time: moment().add(-0.5, 'hour'), end_time: moment().add(0.5, 'hour')},
	  {id: 3, group: 1, title: 'item 3', start_time: moment().add(2, 'hour'), end_time: moment().add(3, 'hour')}
	],
  lastId: 1,
  location: undefined
};

function updateItem(items, itemId, changedData) {
  const itemIndex = _.findIndex(items, shift => shift.id === itemId);
  return [...items.slice(0, itemIndex), {...items[itemIndex], ...changedData}, ...items.slice(itemIndex + 1)]
}

function moveItem(items, itemId, dragTime, newGroupOrder) {
  const item = _.find(items, shift => shift.id === itemId);
  const end_time = moment(dragTime - item.start_time + item.end_time);
  return updateItem(items, itemId, {group: newGroupOrder + 1, start_time: moment(dragTime), end_time });
}

export default function schedule(state=initialState, action) {
  switch (action.type) {
    case RESIZE_ITEM: return {...state, shifts: updateItem(state.shifts, action.itemId, {end_time: moment(action.newResizeEnd)})};
    case MOVE_ITEM:
      return {...state, shifts: moveItem(state.shifts, action.itemId, action.dragTime, action.newGroupOrder)};
    /*
    case RECEIVE_SCHEDULE: return {...state, shifts: calendar.putIntoBuckets(action.shifts), location: action.location};
    case PLACE_ITEM:
      const coverage = state.location.coverage || 1;
      return {...state, shifts: placeItem(state.shifts, action, {
        maxItems: coverage,
        defaultGranularity: calendar.getDefaultGranularity(coverage)
      })};
    case REMOVE_ITEM: return {...state, shifts: calendar.removeItem(state.shifts, action)};
    */
    default: return state;
  }
}
