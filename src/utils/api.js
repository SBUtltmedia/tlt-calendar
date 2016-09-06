import origFetch from 'isomorphic-fetch';
import { DATA_PATH } from '../constants/Settings';

export function fetch(path)  {
  return origFetch(DATA_PATH + path, {mode: 'no-cors', credentials: 'same-origin'});
}
