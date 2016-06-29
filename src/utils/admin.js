import _ from 'lodash';
import * as calendar from './calendar';

export function removeReserve(reserves, reserve) {
  return calendar.placeItem(chipsPlaced, _.assign({}, reserve, {value: undefined}));
}

export function placeReserve(reserves, reserve) {
  return calendar.placeItem(chipsPlaced, _.assign({}, reserve, {value: true}));
}