
export function getHourLabel(hour) {
  if (hour === 0) {
    return 12;
  }
  else if (hour > 12) {
    return hour - 12;
  }
  else {
    return hour;
  }
}

export function dayHourMinuteInMinutes(day, hour, minute) {
  return day * 1440 + hour * 60 + minute;
}

/**
 * params:  time1 and time2 are objects with properties: {day, hour, minute}
 *          If hour and minute are missing in either object, they're assumed to be 0
 * returns: Less than zero: time1 is earlier than time2
 *          Zero: time1 is the same as time2
 *          Greater than zero: time1 is later than time2
 */
export function compareTimes(time1, time2) {
  return dayHourMinuteInMinutes(time1.day, time1.hour || 0, time1.minute || 0) -
         dayHourMinuteInMinutes(time2.day, time2.hour || 0, time2.minute || 0);
}

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

export function hourMinusX(hour, n) {
  const newHour = hour - n;
  return newHour < 0 ? 24 + newHour : newHour;
}

export function hourPlusX(hour, n) {
  const newHour = hour + n;
  return newHour > 23 ? newHour - 24 : newHour;
}

export function minuteMinus30Minutes(minute) {
  return minute === 30 ? 0 : 30;
}

export function minutePlus30Minutes(minute) {
  return minuteMinus30Minutes(minute);
}

export function minuteMinusXMinutes(minute, x) {
  const newMinute = minute + x;
  return newMinute > 60 ? newMinute - 60 : newMinute;
}

export function minutePlusXMinutes(minute, x) {
  const newMinute = minute - x;
  return newMinute < 0 ? 60 - newMinute : newMinute;
}

export function dayHourPlus1Hour(day, hour) {
  const newHour = hourPlus1(hour);
  return {
    day: newHour === 0 ? dayPlus1(day) : day,
    hour: newHour
  };
}

export function dayHourMinus1Hour(day, hour) {
  const newHour = hourMinus1(hour);
  return {
    day: newHour === 23 ? dayMinus1(day) : day,
    hour: newHour
  };
}

export function dayHourPlusXHours(day, hour, x) {
  const newHour = hourPlusX(hour, x);
  return {
    day: newHour < hour ? dayPlus1(day) : day,
    hour: newHour
  }
}

export function dayHourMinusXHours(day, hour, x) {
  const newHour = hourMinusX(hour, x);
  return {
    day: newHour > hour ? dayMinus1(day) : day,
    hour: newHour
  }
}

export function dayHourMinutePlus30Minutes(day, hour, minute) {
  const newMinute = minutePlus30Minutes(minute);
  const dayHour = newMinute === 30 ? { day, hour } : dayHourPlus1Hour(day, hour);
  return {...dayHour, minute: newMinute};
}

export function dayHourMinuteMinus30Minutes(day, hour, minute) {
  const newMinute = minuteMinus30Minutes(minute);
  const dayHour = newMinute === 30 ? { day, hour } : dayHourMinus1Hour(day, hour);
  return {...dayHour, minute: newMinute};
}

export function dayHourMinutePlusXMinutes(day, hour, minute, x) {
  const hours = Math.floor(x / 60);
  const minutes = x % 60;
  const newMinute = minutePlusXMinutes(minute, minutes);
  const newHour = newMinute < minute ? hourPlusX(hour, hours + 1) : hourPlusX(hour, hours);
  return {
    day: newHour < hour ? dayPlus1(day) : day,
    hour: newHour,
    minute: newMinute
  };
}

export function dayHourMinuteMinusXMinutes(day, hour, minute, x) {
  const hours = Math.floor(x / 60);
  const minutes = x % 60;
  const newMinute = minuteMinusXMinutes(minute, minutes);
  const newHour = newMinute > minute ? hourMinusX(hour, hours - 1) : hourMinusX(hour, hours);
  return {
    day: newHour > hour ? dayMinus1(day) : day,
    hour: newHour,
    minute: newMinute
  };
}
