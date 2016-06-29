import _ from 'lodash';
import * as calendar from './calendar';

export function removeReserve(reserves, reserve) {
  return calendar.placeItem(reserves, _.assign({}, reserve, {value: undefined}));
}

export function placeReserve(reserves, reserve) {
  return calendar.placeItem(reserves, _.assign({}, reserve, {value: true}));
}