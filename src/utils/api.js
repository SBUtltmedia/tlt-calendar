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

const mapReceivedTimelineItems = items => {
  let id = 1;
  return _.map(items, item => ({...item, id: id++}));
};

const mapReceivedSchedulesOrSlots = items => {
    return {items: _.map(mapReceivedTimelineItems(items), item => ({...item, group: item.location}))};
};

const mapScheduleOrSlotStateToData = state =>
  _.map(state.timeline.items, item => ({..._.omit(item, ['group']), location: item.group}));

export function getHandler(type) {
  switch (type) {
    case SCHEDULE: return {
      mapStateToPath: () => '/schedules',
      mapStateToData: mapScheduleOrSlotStateToData,
      mapReceivedData: mapReceivedSchedulesOrSlots
    };
    case SLOTS: return {
      mapStateToPath: () => '/slots',
      mapStateToData: mapScheduleOrSlotStateToData,
      mapReceivedData: mapReceivedSchedulesOrSlots
    };
    case HOUR_PREFERENCES: return {
      mapStateToPath: state => `/employees/${state.hourPreferences.employee.netId}/hour-preferences`,
      mapStateToData: state => ({...state.hourPreferences, items: _.map(state.timeline.items, item => _.omit(item, ['group']))}),
      mapReceivedData: json => ({...json, items: mapReceivedTimelineItems(json.items)})
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
