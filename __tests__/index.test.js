import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../src/pages/index';

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />);
    expect(screen.getByText(/Get Your Cash Offer/i)).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    render(<Home />);
    
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: '555-555-5555' },
    });
    fireEvent.change(screen.getByLabelText(/address/i), {
      target: { value: '123 Test St' },
    });

    fireEvent.click(screen.getByText(/Get My Cash Offer/i));
    
    // Add more assertions based on your form submission logic
  });
});