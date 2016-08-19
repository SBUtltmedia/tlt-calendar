import _ from 'lodash';
import * as calendar from './calendar';
import { RESERVED } from '../constants/Constants';

/**
 * Used for both checking existing cell items and a newly placed cell item for whether multiples should be used/allowed.
 */
export const overrideMultiplesFn = items => _.every(items, item => item.value === RESERVED);  // every or some?

export const placeItem = (items, item, options) => calendar.placeItem(items, item, {...options, overrideMultiplesFn});
