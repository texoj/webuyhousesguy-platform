import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CityPage from '../src/pages/[city]';

describe('City Page Tests', () => {
  const mockCityData = {
    name: 'Dallas',
    neighborhoods: ['Downtown', 'Uptown'],
    coordinates: { lat: 32.7767, lng: -96.7970 }
  };

  beforeEach(() => {
    render(<CityPage cityData={mockCityData} />);
  });

  test('renders city name in title', () => {
    expect(screen.getByText(/Dallas/i)).toBeInTheDocument();
  });

  test('form submission works', async () => {
    const nameInput = screen.getByLabelText(/name/i);
    const phoneInput = screen.getByLabelText(/phone/i);
    const addressInput = screen.getByLabelText(/address/i);

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(phoneInput, { target: { value: '555-555-5555' } });
    fireEvent.change(addressInput, { target: { value: '123 Test St' } });

    const submitButton = screen.getByText(/get.*offer/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    });
  });
});