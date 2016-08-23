import _ from 'lodash';

export function dispatchAndSave(...objs) {
  return (dispatch, getState) => {
    _.each(objs, obj => dispatch(obj));
    const state = getState();
    console.log('SAVING...');
  };
}
