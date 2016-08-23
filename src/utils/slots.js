import * as calendar from './calendar';

export const placeItem = (items, item, options) => calendar.placeItem(items, item, {...options, chopOnDelete: false});
