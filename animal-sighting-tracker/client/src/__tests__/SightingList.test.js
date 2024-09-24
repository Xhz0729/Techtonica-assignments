import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SightingList from '../components/SightingList';
import SightingCard from '../components/SightingCard';

// Mock the SightingCard component to simplify the test
jest.mock('../components/SightingCard', () => ({ sighting }) => (
  <div data-testid="sighting-card">
    <h3>Nickname: {sighting.nickname}</h3>
  </div>
));

describe('SightingList Component', () => {
  test('renders "No sightings available" when there are no sightings', () => {
    render(<SightingList sightings={[]} dispatch={jest.fn()} />);
    
    expect(screen.getByText(/No sightings available/i)).toBeInTheDocument();
  });

  test('renders a list of SightingCard components when sightings are available', () => {
    const mockSightings = [
      {
        id: 1,
        nickname: 'Eagle',
        species: 'Bird',
        recent_sighting: '2023-09-01',
        recent_sighting_location: 'National Park',
        sightings_count: 10,
      },
      {
        id: 2,
        nickname: 'Fox',
        species: 'Mammal',
        recent_sighting: '2023-09-10',
        recent_sighting_location: 'Woods',
        sightings_count: 5,
      },
    ];

    render(<SightingList sightings={mockSightings} dispatch={jest.fn()} />);
    
    // Ensure there are exactly 2 sighting cards rendered
    const sightingCards = screen.getAllByTestId('sighting-card');
    expect(sightingCards).toHaveLength(2);
    
    // Check that the first card has the correct nickname
    expect(sightingCards[0]).toHaveTextContent('Nickname: Eagle');
    // Check that the second card has the correct nickname
    expect(sightingCards[1]).toHaveTextContent('Nickname: Fox');
  });
});
