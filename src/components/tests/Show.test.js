import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';

const showData = {
  name: 'ljafsa',
  summary: 'ajlfsdkjlfksa',
  seasons: [
             {
               id: 0,
               episodes: [],
             },
             {
               id: 1,
               episodes: [],
             },
             {
               id: 2,
               episodes: [],
             },
           ],

}

test('renders without errors', () => {
  render(<Show show={showData} selectedSeason='none' />); 
});

test('renders Loading component when prop show is null', () => {
  const wrapper = render(<Show show={null} selectedSeason='none' />);
  const loading = wrapper.queryByTestId('loading-container');
  expect(loading).toBeInTheDocument(); 
});

test('renders same number of options seasons are passed in', () => {
  const wrapper = render(<Show show={showData} selectedSeason='none' />);
  const seasons = wrapper.queryAllByTestId('season-option');
  expect(seasons).toHaveLength(3);
});

test('handleSelect is called when an season is selected', () => {
  const mock = jest.fn();
  const wrapper = render(<Show show={showData} selectedSeason='none' handleSelect={mock} />);
  userEvent.selectOptions(screen.getByRole('combobox'),['1']);
  expect(mock).toHaveBeenCalled();
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
  const wrapper = render(<Show show={showData} selectedSeason='none' />);
  expect(wrapper.queryByTestId('episodes-container')).not.toBeInTheDocument();
  wrapper.rerender(<Show show={showData} selectedSeason={1} />);
  expect(wrapper.queryByTestId('episodes-container')).toBeInTheDocument();
  
});
