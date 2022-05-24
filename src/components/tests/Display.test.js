import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';

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

test('renders without errors with no props', async () => {
  render(<Display />);
});

test('renders Show component when the button is clicked ', async () => {
  const wrapper = render(<Display />);
  const button = wrapper.queryByText(/Show Data/i);
  fireEvent.click(button);
  await waitFor(() => expect(wrapper.queryByTestId('show-container')).toBeInTheDocument() )
});

test('renders show season options matching your data when the button is clicked', async () => {
  const wrapper = render(<Display />);
  const button = wrapper.queryByText(/Show Data/i);
  fireEvent.click(button);
  await waitFor(() => expect(wrapper.queryAllByTestId('season-option')).toHaveLength(4) )
});

test('callback is called when button is clicked', async () => {
  const mock = jest.fn();
  const wrapper = render(<Display displayFunc={mock} />);
  const button = wrapper.queryByText(/Show Data/i);
  fireEvent.click(button);
  await waitFor(() => expect(mock).toHaveBeenCalled());
});
