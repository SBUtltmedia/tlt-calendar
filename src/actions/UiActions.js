import { SHOW_SLOTS, HIDE_SLOTS } from '../constants/ActionTypes';

export function showSlots() {
  return {
    type: SHOW_SLOTS
  };
}

export function hideSlots() {
  return {
    type: HIDE_SLOTS
  };
}
