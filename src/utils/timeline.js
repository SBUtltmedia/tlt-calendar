import _ from 'lodash';
import moment from 'moment';

export function getItemIndex(items, itemId) {
  return _.findIndex(items, shift => shift.id === itemId);
}

export function updateItem(items, itemId, changedData) {
  const itemIndex = getItemIndex(items, itemId);
  return [...items.slice(0, itemIndex), {...items[itemIndex], ...changedData}, ...items.slice(itemIndex + 1)];
}

export function addItem(items, item) {
  return [...items, {...item, id: new Date().getTime()}];
}

export function removeItem(items, itemId) {
  const itemIndex = getItemIndex(items, itemId);
  return [...items.slice(0, itemIndex), ...items.slice(itemIndex + 1)];
}

export function moveItem(items, itemId, dragTime, newGroupOrder) {
  const item = _.find(items, shift => shift.id === itemId);
  const end_time = moment(dragTime - item.start_time + item.end_time);
  return updateItem(items, itemId, {group: newGroupOrder + 1, start_time: moment(dragTime), end_time });
}
