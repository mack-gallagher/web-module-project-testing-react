import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Episode from './../Episode';

const exampleEpisode = {
  id: "foiafh",
  image: '',
  name: 'ajlfhwo',
  season: [],
  number: 'lakfoew',
  summary: 'owf',
  runtime: 0,
}

const specificSummaryData = {
  id: "foiafh",
  image: '',
  name: 'ajlfhwo',
  season: [],
  number: 'lakfoew',
  summary: 'AAAA',
  runtime: 0,
}

const nullImageData = {
  id: "foiafh",
  image: null,
  name: 'ajlfhwo',
  season: [],
  number: 'lakfoew',
  summary: 'owf',
  runtime: 0,
}

test("renders without error", () => {
  render(<Episode
           episode={exampleEpisode}
         />)
});

test("renders the summary test passed as prop", () => {
  const episode = render(<Episode
                           episode={specificSummaryData}
                         />);
  const { container } = episode;
  let summary = container.querySelectorAll('p')[1];
  expect(summary).toHaveTextContent('AAAA');
  expect(summary.textContent).toBe('AAAA');
  summary = episode.queryByText('AAAA');
  expect(summary).toBeInTheDocument();
});

test("renders default image when image is not defined", () => {
  const episode = render(<Episode
                           episode={nullImageData}
                         />);
  const img = episode.queryByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png');
  expect(img).toBeInTheDocument(); 
});
