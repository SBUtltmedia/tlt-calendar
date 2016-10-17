import { RECEIVE_SLOTS, ADD_SLOT, REMOVE_SLOT } from '../constants/ActionTypes';
import { placeItem } from '../utils/slots';
import moment from 'moment';

const initialState = {
  slots: [
		{id: 1, location: 1, start_time: moment(), end_time: moment().add(1, 'hour'), },
	  {id: 2, location: 2, start_time: moment().add(-0.5, 'hour'), end_time: moment().add(0.5, 'hour')},
	  {id: 3, location: 1, start_time: moment().add(2, 'hour'), end_time: moment().add(3, 'hour')}
	]
};

export default function slots(state=initialState, action) {
  switch (action.type) {
    case RECEIVE_SLOTS: return {...state, slots: calendar.putIntoBuckets(action.slots), location: action.location};
    case ADD_SLOT: return {...state, slots: placeItem(state.slots, action)};
    case REMOVE_SLOT: return {...state, slots: calendar.removeItem(state.slots, action)};
    default: return state;
  }
}
