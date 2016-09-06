import _ from 'lodash';
import { save } from '../utils/api';

export function dispatchAndSave(mapStateToPostPath, mapStateToData, ...dispatchObjs) {
  return (dispatch, getState) => {
    _.each(dispatchObjs, obj => dispatch(obj));
    const state = getState();
    save(mapStateToPostPath(state), mapStateToData(state));
  };
}
