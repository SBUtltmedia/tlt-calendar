import { RECEIVE_SCHEDULE, ADD_ITEM, REMOVE_ITEM, RESIZE_ITEM, MOVE_ITEM } from '../constants/ActionTypes';
import * as timeline from '../utils/timeline';
import moment from 'moment';

const initialState = {
  shifts: [
		{id: 1, location: 1, value: {netId: 'rzou', firstName: 'Rong', lastName: 'Zou'}, start_time: moment(), end_time: moment().add(1, 'hour'), },
	  {id: 2, location: 2, value: {netId: 'rzou', firstName: 'Rong', lastName: 'Zou'}, start_time: moment().add(-0.5, 'hour'), end_time: moment().add(0.5, 'hour')},
	  {id: 3, location: 1, value: {netId: 'rzou', firstName: 'Rong', lastName: 'Zou'}, start_time: moment().add(2, 'hour'), end_time: moment().add(3, 'hour')}
	]
};

export default function schedule(state=initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return {...state, shifts: timeline.addItem(state.shifts, action.item)};
    case RESIZE_ITEM:
      return {...state, shifts: timeline.updateItem(state.shifts, action.itemId, {end_time: moment(action.newResizeEnd)})};
    case MOVE_ITEM:
      return {...state, shifts: timeline.moveItem(state.shifts, action.itemId, action.dragTime, action.newGroupOrder)};
    case REMOVE_ITEM:
      return {...state, shifts: timeline.removeItem(state.shifts, action.itemId)};
    default: return state;
  }
}
