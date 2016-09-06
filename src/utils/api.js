import origFetch from 'isomorphic-fetch';
import { REMOTE_DATA_PATH, LOCAL_DATA_PATH } from '../constants/Settings';

function getBasePath() {
  return process.env.NODE_ENV === 'production' ? REMOTE_DATA_PATH : LOCAL_DATA_PATH;
}

function getExtension() {
  return process.env.NODE_ENV === 'production' ? '' : '.json';
}

export function fetch(path)  {
  return origFetch(getBasePath() + path + getExtension(), {mode: 'no-cors', credentials: 'same-origin'});
}
