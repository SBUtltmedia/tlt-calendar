import fetch from 'isomorphic-fetch';
import { DATA_PATH } from '../constants/Settings';

export function fetch(path)  {
return fetch(DATA_PATH + path, {mode: 'no-cors'});
}
