import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { calculateWalkTime, getSpaceType, getCircumference } from './helpers';

it('renders without crashing', () => {
  if (window.sessionStorage) {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  }
});

it('returns the type of space', () => {
  expect(getSpaceType('something something random')).toEqual('');
  expect(getSpaceType('car park on main street')).toEqual('car park ');
  expect(getSpaceType('driveway on main street')).toEqual('driveway ');
  expect(getSpaceType('spaceship on main street')).toEqual('spaceship ');
});

it('calculates walk time to the nearest minute', () => {
  expect(calculateWalkTime(0.08)).toEqual('1 min');
  expect(calculateWalkTime(0.18)).toEqual('3 mins');
  expect(calculateWalkTime(1.5)).toEqual('29 mins');
  expect(calculateWalkTime(1)).toEqual('19 mins');
});
