import { expect } from 'chai';
import { dayHourMinutePlusXMinutes, dayHourMinuteMinusXMinutes, timeToKey } from '../../src/utils/time';

describe('time', () => {
  it('gets the string key of a cell from day, hour, minute', () => {
    expect(timeToKey({day: 0, hour: 0, minute: 0})).to.equal("0");
    expect(timeToKey({day: 0, hour: 0, minute: 30})).to.equal("30");
    expect(timeToKey({day: 0, hour: 1, minute: 30})).to.equal("90");
    expect(timeToKey({day: 0, hour: 23, minute: 30})).to.equal("1410");
    expect(timeToKey({day: 1, hour: 0, minute: 0})).to.equal("1440");
  });

  it('dayHourMinutePlusXMinutes1 A', () => {
    expect(timeToKey(dayHourMinutePlusXMinutes(0, 0, 0, 60))).to.deep.equal(timeToKey({day: 0, hour: 1, minute: 0}));
  });

  it('dayHourMinutePlusXMinutes1 B', () => {
    expect(timeToKey(dayHourMinutePlusXMinutes(6, 23, 0, 60))).to.deep.equal(timeToKey({day: 0, hour: 0, minute: 0}));
  });

  it('dayHourMinutePlusXMinutes w/o wrap A', () => {
    expect(timeToKey(dayHourMinutePlusXMinutes(6, 23, 0, 60, false))).to.deep.equal(timeToKey({day: 7, hour: 0, minute: 0}));
  });

  it('dayHourMinutePlusXMinutes w/o wrap B', () => {
    expect(timeToKey(dayHourMinutePlusXMinutes(6, 23, 30, 60, false))).to.deep.equal(timeToKey({day: 7, hour: 0, minute: 30}));
  });

  it('dayHourMinuteMinusXMinutes A', () => {
    expect(timeToKey(dayHourMinuteMinusXMinutes(0, 0, 0, 60))).to.deep.equal(timeToKey({day: 6, hour: 23, minute: 0}));
  });

  it('dayHourMinuteMinusXMinutes B', () => {
    expect(timeToKey(dayHourMinuteMinusXMinutes(0, 0, 0, 30))).to.deep.equal(timeToKey({day: 6, hour: 23, minute: 30}));
  });

  it('dayHourMinuteMinusXMinutes w/o wrap A', () => {
    expect(timeToKey(dayHourMinuteMinusXMinutes(0, 0, 0, 60, false))).to.deep.equal(timeToKey({day: -1, hour: 23, minute: 0}));
  });

  it('dayHourMinuteMinusXMinutes w/o wrap B', () => {
    expect(timeToKey(dayHourMinuteMinusXMinutes(0, 0, 0, 30, false))).to.deep.equal(timeToKey({day: -1, hour: 23, minute: 30}));
  });
});
