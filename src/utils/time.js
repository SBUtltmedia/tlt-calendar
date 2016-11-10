
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
