import { expect } from 'chai';
import { dayHourMinutePlusXMinutes } from '../../src/utils/time';

describe('time', () => {
  it('dayHourMinutePlusXMinutes', () => {
    expect(dayHourMinutePlusXMinutes(0, 0, 0, 60)).to.deep.equal({day: 0, hour: 1, minute: 0});
    expect(dayHourMinutePlusXMinutes(0, 0, 0, 90)).to.deep.equal({day: 0, hour: 1, minute: 30});
  });

  it('dayHourMinutePlusXMinutes w/o wrap', () => {
    expect(dayHourMinutePlusXMinutes(6, 23, 0, 60, false)).to.deep.equal({day: 7, hour: 0, minute: 0});
    expect(dayHourMinutePlusXMinutes(6, 23, 30, 60, false)).to.deep.equal({day: 7, hour: 0, minute: 30});
  });
});
