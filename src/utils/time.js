export function timeToIndex({day, hour=0, minute=0}) {
  return day * 48 + Math.floor(hour * 2) + Math.floor(minute / 30);
}

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
