import _ from 'lodash';

export function dayMinus1(day) {
  return day === 0 ? 6 : day - 1;
}

export function dayPlus1(day) {
  return day === 6 ? 0 : day + 1;
}

export function hourMinus1(hour) {
  return hour === 0 ? 23 : hour - 1;
}

export function hourPlus1(hour) {
  return hour === 23 ? 0 : hour + 1;
}

export function minutesMinus30Minutes(minutes) {
  return minutes === 30 ? 0 : 30;
}

export function minutesPlus30Minutes(minutes) {
  return minutesMinus30Minutes(minutes);
}

export function dayHourPlus1Hour(day, hour) {
  const newHour = hourPlus1(hour);
  return {
    day: newHour === 0 ? dayPlus1(day) : day,
    hour: newHour
  };
}

export function dayHourMinus1(day, hour) {
  const newHour = hourMinus1(hour);
  return {
    day: newHour === 23 ? dayMinus1(day) : day,
    hour: newHour
  };
}

/*
export function dayHourMinutesPlus30Minutes(day, hour, minutes) {
  const newMinutes = minutesPlus30Minutes(minutes);
  const dayHour = newMinutes === 30 ? { day, hour } : dayHourPlus1Hour(day, hour);
  return _.assign({}, dayHour, { minutes: newMinutes });
}

export function dayHourMinutesMinus30Minutes(day, hour, minutes) {
  const newMinutes = minutesMinus30Minutes(minutes);
  const dayHour = newMinutes === 30 ? { day, hour } : dayHourMinus1Hour(day, hour);
  return _.assign({}, dayHour, { minutes: newMinutes });
}
*/
