export function nestSlots(slots) {
  const bySession = _.groupBy(slots, 'Session')
  const byLocation = _.mapValues(bySession, s => _.groupBy(s, 'Site'))
  return _.mapValues(byLocation, s => _.mapValues(  // remove reduntant fields
    s, l => _.map(l, item => _.omit(item, ['Session', 'Site']))))
}
