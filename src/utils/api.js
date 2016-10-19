import origFetch from 'isomorphic-fetch';
import { REMOTE_DATA_PATH, LOCAL_DATA_PATH, SCHEDULE, SLOTS, HOUR_PREFERENCES } from '../constants/Settings';

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

export function getHandler(type) {
  switch (type) {
    case SCHEDULE: return {
      path: '/schedules'
      mapStateToData: state => ({...state.schedule, shifts: _.values(state.schedule.shifts)})
    };
    case SLOTS: return {
      path: '/slots'
      mapStateToData: state => ({...state.slots, slots: _.values(state.slots.slots)})
    };
    case HOUR_PREFERENCES: return {
      mapStateToPath: state => `/employees/${state.hourPreferences.employee.netId}/hour-preferences`,
      mapStateToData: state => state.hourPreferences
    }
  }
}

export function saveState(path, state, type) {
  const handler = getHandler(type);
  const path = handler.path? handler.path : handler.mapStateToPath(state);
  const data = handler.mapStateToData(state);
  return save(path, data);
}
