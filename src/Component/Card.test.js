import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react'; // Import act from react
import Card from './Card';
import '@testing-library/jest-dom/extend-expect';

describe('Card Component', () => {
  const mockRemoveTour = jest.fn();
  const mockProps = {
    id: 1,
    image: 'test-image.jpg',
    info: 'This is a long description for the tour. It contains more than 200 characters to ensure that the read more and show less functionality is triggered when necessary. The rest of the description will be hidden until the read more button is clicked.',
    price: '$100',
    name: 'Test Tour',
    removeTour: mockRemoveTour,
  };

  it('renders correctly with given props', () => {
    act(() => {
      render(<Card {...mockProps} />);
    });

    // Check if the image is rendered
    const image = screen.getByAltText('img');
    expect(image).toHaveAttribute('src', mockProps.image);

    // Check if price and name are displayed correctly
    expect(screen.getByText(mockProps.price)).toBeInTheDocument();
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();

    // Check if the truncated description is rendered
    const truncatedDescription = mockProps.info.substring(0, 200);
    expect(screen.getByText(`${truncatedDescription}....`)).toBeInTheDocument();
  });

  it('toggles the description text when read more is clicked', () => {
    act(() => {
      render(<Card {...mockProps} />);
    });

    // Initially, truncated description is shown
    const truncatedDescription = mockProps.info.substring(0, 200);
    expect(screen.getByText(`${truncatedDescription}....`)).toBeInTheDocument();

    // Click the "read more" link
    act(() => {
      fireEvent.click(screen.getByText('read more'));
    });

    // Full description should now be displayed
    expect(screen.getByText(mockProps.info)).toBeInTheDocument();

    // Click "show less" to collapse the text again
    act(() => {
      fireEvent.click(screen.getByText('show less'));
    });
    expect(screen.getByText(`${truncatedDescription}....`)).toBeInTheDocument();
  });

  it('calls the removeTour function when Not Interested button is clicked', () => {
    act(() => {
      render(<Card {...mockProps} />);
    });

    // Click the "Not Interested" button
    act(() => {
      fireEvent.click(screen.getByText('Not Interested'));
    });

    // Check if removeTour was called with the correct id
    expect(mockRemoveTour).toHaveBeenCalledWith(mockProps.id);
  });
});
