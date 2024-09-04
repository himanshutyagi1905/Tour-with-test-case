import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Tours from './Tours';

const mockTours = [
  { id: '1', name: 'Tour 1', info: 'This is the description for Tour 1.', price: '$100', image: 'image1.jpg' },
  { id: '2', name: 'Tour 2', info: 'This is the description for Tour 2.', price: '$200', image: 'image2.jpg' }
];

const mockRemoveTours = jest.fn();

describe('Tours Component', () => {
  test('renders the Tours component', () => {
    render(<Tours tours={mockTours} removeTours={mockRemoveTours} />);

    // Check if the title is rendered
    expect(screen.getByText('Plan your destination')).toBeInTheDocument();

    // Check if the tours are rendered
    mockTours.forEach((tour) => {
      expect(screen.getByText(tour.name)).toBeInTheDocument();

      const cardElement = screen.getByText(tour.name).closest('.card');
      expect(cardElement).toHaveTextContent(tour.info.substring(0, 200));
    });
  });
});
