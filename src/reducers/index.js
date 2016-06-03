import moment from 'moment';

const initialState = {
  groups: [
    {id: 1, title: 'group 1'},
    {id: 2, title: 'group 2'}
  ], items: [
    {id: 1, group: 1, title: 'item 1', start_time: moment(), end_time: moment().add(1, 'hour')},
    {id: 2, group: 2, title: 'item 2', start_time: moment().add(-0.5, 'hour'), end_time: moment().add(0.5, 'hour')},
    {id: 3, group: 1, title: 'item 3', start_time: moment().add(2, 'hour'), end_time: moment().add(3, 'hour')}
  ]
};

export default function app(state=initialState, action) {
  return state;
}
