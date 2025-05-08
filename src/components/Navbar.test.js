import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './Navbar';


describe('JoinTable Component', () => {
   
    test('renders navbar', () => {
        render(<Navbar />);

        // Check if the nav bar elements are rendered
        expect(screen.getByText('All a Board')).toBeInTheDocument();
        expect(screen.getByText('Board Games')).toBeInTheDocument();
        expect(screen.getByText('Warehouses')).toBeInTheDocument();
        expect(screen.getByText('Inventory')).toBeInTheDocument();
        expect(screen.getByText('Place Order')).toBeInTheDocument();
    });
});
