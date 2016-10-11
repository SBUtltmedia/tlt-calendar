import { RECEIVE_SCHEDULE, ADD_ITEM, REMOVE_ITEM, RESIZE_ITEM, MOVE_ITEM } from '../constants/ActionTypes';
import moment from 'moment';

const initialState = {
  shifts: [
		{id: 1, group: 1, title: 'item 1', start_time: moment(), end_time: moment().add(1, 'hour'), },
	  {id: 2, group: 2, title: 'item 2', start_time: moment().add(-0.5, 'hour'), end_time: moment().add(0.5, 'hour')},
	  {id: 3, group: 1, title: 'item 3', start_time: moment().add(2, 'hour'), end_time: moment().add(3, 'hour')}
	],
  location: undefined
};

function getItemIndex(items, itemId) {
  return _.findIndex(items, shift => shift.id === itemId);
}

function updateItem(items, itemId, changedData) {
  const itemIndex = getItemIndex(items, itemId);
  return [...items.slice(0, itemIndex), {...items[itemIndex], ...changedData}, ...items.slice(itemIndex + 1)];
}

function addItem(items, item) {
  return [...items, {...item, id: new Date().getTime()}];
}

function removeItem(items, itemId) {
  const itemIndex = getItemIndex(items, itemId);
  return [...items.slice(0, itemIndex), ...items.slice(itemIndex + 1)];
}

function moveItem(items, itemId, dragTime, newGroupOrder) {
  const item = _.find(items, shift => shift.id === itemId);
  const end_time = moment(dragTime - item.start_time + item.end_time);
  return updateItem(items, itemId, {group: newGroupOrder + 1, start_time: moment(dragTime), end_time });
}

export default function schedule(state=initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return {...state, shifts: addItem(state.shifts, action.item)};
    case RESIZE_ITEM:
      return {...state, shifts: updateItem(state.shifts, action.itemId, {end_time: moment(action.newResizeEnd)})};
    case MOVE_ITEM:
      return {...state, shifts: moveItem(state.shifts, action.itemId, action.dragTime, action.newGroupOrder)};
    case REMOVE_ITEM:
      return {...state, shifts: removeItem(state.shifts, action.itemId)};
    default: return state;
  }
}
