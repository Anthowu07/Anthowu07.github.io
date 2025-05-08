import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import JoinTable from './JoinTable';
import { fetchJoinTableData } from "../services/joinTableApi";

// Mock the API calls
jest.mock('../services/joinTableApi');
describe('JoinTable Component', () => {
    const mockInventory = [
        { inventory_id: 1, boardgame: { name: 'Catan' }, quantity_available: 10 },
        { inventory_id: 2, boardgame: { name: 'Ticket to Ride' }, quantity_available: 5 },
    ];

    beforeEach(() => {
        fetchJoinTableData.mockResolvedValue(mockInventory);
        render(<JoinTable />);
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    test('renders table with data when API call is successful', async () => {

        // Check if the table headers are rendered
        expect(screen.getByText('Board Game Name')).toBeInTheDocument();
        expect(screen.getByText('Quantity in Stock')).toBeInTheDocument();

        // Wait for the data to be loaded and displayed in the table
        await waitFor(() => {
            expect(screen.getByText('Catan')).toBeInTheDocument();
            expect(screen.getByText('Ticket to Ride')).toBeInTheDocument();
        });
    });

    test('renders error message when API call fails', async () => {
        const errorMessage = 'Network response was not ok';
        fetchJoinTableData.mockRejectedValue(new Error(errorMessage));

        render(<JoinTable />);

        // Wait for the error message to be displayed
        await waitFor(() => {
            expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
        });
    });
});
