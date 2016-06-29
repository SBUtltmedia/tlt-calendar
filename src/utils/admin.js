import _ from 'lodash';
import * as calendar from './calendar';
import { RESERVED } from '../constants/Constants';

export function removeItem(calendarItems, reserve) {
  return calendar.placeItem(calendarItems, _.assign({}, reserve, {value: undefined}));
}

export function placeReserve(calendarItems, reserve) {
  return calendar.placeItem(calendarItems, _.assign({}, reserve, {value: {name: RESERVED}}));
}