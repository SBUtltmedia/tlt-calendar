import origFetch from 'isomorphic-fetch';
import { REMOTE_DATA_PATH, LOCAL_DATA_PATH } from '../constants/Settings';

const FETCH_PARAMS = {
  mode: 'no-cors',
  credentials: 'same-origin'
};

function getBasePath() {
  return process.env.NODE_ENV === 'production' ? REMOTE_DATA_PATH : LOCAL_DATA_PATH;
}

function getExtension() {
  return process.env.NODE_ENV === 'production' ? '' : '.json';
}

export function fetch(path)  {
  return origFetch(getBasePath() + path + getExtension(), FETCH_PARAMS);
}

export function save(path, data) {
  if (process.env.NODE_ENV === 'production') {
    origFetch(getBasePath() + path, {
      ...FETCH_PARAMS,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }
  else {
    console.log('SAVING ', data, 'TO', path);
  }
}
