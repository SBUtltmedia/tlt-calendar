import { CHANGE_SETTINGS } from '../constants/ActionTypes';

export function changeSettings(newSettings) {
  return {
    type: CHANGE_SETTINGS,
    settings: newSettings
  }
}
