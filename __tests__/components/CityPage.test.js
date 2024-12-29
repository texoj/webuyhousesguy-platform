import { render, screen } from '@testing-library/react';
import CityPage from '../../src/pages/[city]';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { city: 'dallas' }
    };
  }
}));

describe('CityPage', () => {
  it('renders city-specific content', () => {
    const cityData = {
      name: 'Dallas',
      neighborhoods: ['Downtown', 'Uptown'],
      testimonials: [{
        name: 'John D.',
        quote: 'Great service!'
      }]
    };

    render(<CityPage cityData={cityData} />);
    expect(screen.getByText(/We Buy Houses in Dallas/i)).toBeInTheDocument();
  });
});