import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from './Button';
import Welcome from './Welcome';
import Modal from '../src/components/TimelineModal';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import * as reducers from '../src/reducers';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));

storiesOf('Modal', module)
  .add('basic', () => (
    <Modal open={true} store={store} />
  ));

storiesOf('Modal', module)
  .add('with location', () => (
    <Modal open={true} useLocation={true} store={store} />
  ));

storiesOf('Modal', module)
  .add('with children', () => (
    <Modal open={true} useLocation={true} store={store}>
      <div>Children</div>
    </Modal>
  ));
