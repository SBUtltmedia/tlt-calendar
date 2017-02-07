import origFetch from 'isomorphic-fetch'
import { REMOTE_DATA_PATH, LOCAL_DATA_PATH } from '../constants/Settings'
import { SCHEDULE, SLOTS, HOUR_PREFERENCES } from '../constants/Constants'
import _ from 'lodash'

const FETCH_PARAMS = {
  mode: 'no-cors',
  credentials: 'same-origin',
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json'
  }
}

const getBasePath = () => process.env.NODE_ENV === 'production' ? REMOTE_DATA_PATH : LOCAL_DATA_PATH
const getExtension = () => process.env.NODE_ENV === 'production' ? '' : '.json'

const mapReceivedTimelineItems = items => {
  let id = 1
  return _.map(items, item => ({...item, id: id++}))
}

const mapReceivedSchedulesOrSlots = items => {
    return {items: _.map(mapReceivedTimelineItems(items), item => ({...item, group: item.location}))}
}

const mapScheduleOrSlotStateToData = state =>
  _.map(state.timeline.items, item => ({..._.omit(item, ['id', 'group']), location: item.group}))

export function fetch(path) {
  return origFetch(getBasePath() + path + getExtension(), FETCH_PARAMS)
}

export function save(path, data) {
  if (process.env.NODE_ENV === 'production') {
    origFetch(getBasePath() + path, {
      ...FETCH_PARAMS,
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
  else {
    console.log('SAVING ', data, 'TO', path)
  }
}
