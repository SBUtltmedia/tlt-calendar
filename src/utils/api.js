import origFetch from 'isomorphic-fetch';
import { REMOTE_DATA_PATH, LOCAL_DATA_PATH } from '../constants/Settings';
import { SCHEDULE, SLOTS, HOUR_PREFERENCES } from '../constants/Constants';
import _ from 'lodash';

const FETCH_PARAMS = {
  mode: 'no-cors',
  credentials: 'same-origin'
};

const getBasePath = () => process.env.NODE_ENV === 'production' ? REMOTE_DATA_PATH : LOCAL_DATA_PATH;
const getExtension = () => process.env.NODE_ENV === 'production' ? '' : '.json';

const mapReceivedSchedulesOrSlots = json => {
    let id = 1;
    return {items: _.map(json, item => ({...item, group: item.location, id: id++}))};
};

export function getHandler(type) {
  switch (type) {
    case SCHEDULE: return {
      mapStateToPath: () => '/schedules',
      mapStateToData: state => ({...state.schedule, items: _.values(state.timeline.items)}),
      mapReceivedData: mapReceivedSchedulesOrSlots
    };
    case SLOTS: return {
      mapStateToPath: () => '/slots',
      mapStateToData: state => ({...state.slots, items: _.values(state.timeline.items)}),
      mapReceivedData: mapReceivedSchedulesOrSlots
    };
    case HOUR_PREFERENCES: return {
      mapStateToPath: state => `/employees/${state.hourPreferences.employee.netId}/hour-preferences`,
      mapStateToData: state => ({...state.hourPreferences, items: _.values(state.timeline.items)}),
      mapReceivedData: _.identity
    }
  }
}

export function fetch(path) {
  return origFetch(getBasePath() + path + getExtension(), FETCH_PARAMS);
}

export function fetchType(type, state) {
  const handler = getHandler(type);
  return fetch(handler.mapStateToPath(state));
}

export function receiveType(type, json) {
  const handler = getHandler(type);
  return handler.mapReceivedData(json);
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

export function saveState(state, type) {

  console.log('type', type);

  const handler = getHandler(type);
  const path = handler.mapStateToPath(state);
  const data = handler.mapStateToData(state);
  return save(path, data);
}
