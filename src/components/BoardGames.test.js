import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BoardGameList from './BoardGames';
import { getBoardGames, createBoardGame, deleteBoardGame, updateBoardGame } from '../services/boardgameApi';

// Mock the API calls
jest.mock('../services/boardgameApi');

const mockBoardGames = [
    { boardgame_id: 1, name: 'Catan', publisher: 'Kosmos', reorder_quantity: 5 },
    { boardgame_id: 2, name: 'Ticket to Ride', publisher: 'Days of Wonder', reorder_quantity: 3 },
];


beforeEach(() => {
    getBoardGames.mockResolvedValue(mockBoardGames);
    createBoardGame.mockResolvedValue({});
    deleteBoardGame.mockResolvedValue({});
    updateBoardGame.mockResolvedValue({});
    render(<BoardGameList />);
});

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
});
describe('Board Games List Component', () => {
    test('renders board game list with fetched data', async () => {

        // Assert that the table headers are rendered
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Publisher')).toBeInTheDocument();
        expect(screen.getByText('Reorder Quantity')).toBeInTheDocument();
        expect(screen.getByText('Actions')).toBeInTheDocument();

        // Wait for board games to be fetched and displayed
        await waitFor(() => {
            expect(screen.getByText('Catan')).toBeInTheDocument();
            expect(screen.getByText('Ticket to Ride')).toBeInTheDocument();
        });
    });

    test('handles adding a new board game', async () => {

        // Click "Add Board Game" button to show the form
        fireEvent.click(screen.getByText('Add Board Game'));

        // Fill out the form
        fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Pandemic' } });
        fireEvent.change(screen.getByPlaceholderText('Publisher'), { target: { value: 'Z-Man Games' } });
        fireEvent.change(screen.getByPlaceholderText('Reorder Quantity'), { target: { value: 10 } });

        // Submit the form
        fireEvent.click(screen.getByText('Create'));

        // Wait for createBoardGame to be called
        await waitFor(() => {
            expect(createBoardGame).toHaveBeenCalledWith({ name: 'Pandemic', publisher: 'Z-Man Games', reorder_quantity: "10" });
        });

        // Wait for the board game list to be refreshed
        await waitFor(() => {
            expect(getBoardGames).toHaveBeenCalledTimes(2);
        });
    });

    test('handles editing a board game', async () => {

        // Wait for the board games to be fetched and rendered
        await waitFor(() => {
            expect(screen.getByText('Catan')).toBeInTheDocument();
        });

        // Click "Edit" button for the first board game
        fireEvent.click(screen.getAllByText('Edit')[0]);

        // Check that the form is populated with the board game's data
        expect(screen.getByPlaceholderText('Name')).toHaveValue('Catan');
        expect(screen.getByPlaceholderText('Publisher')).toHaveValue('Kosmos');
        expect(screen.getByPlaceholderText('Reorder Quantity')).toHaveValue(5);

        // Update the form and submit
        fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Catan: Expanded' } });
        fireEvent.click(screen.getByText('Update'));

        // Wait for updateBoardGame to be called
        await waitFor(() => {
            expect(updateBoardGame).toHaveBeenCalledWith({ boardgame_id: 1, name: 'Catan: Expanded', publisher: 'Kosmos', reorder_quantity: 5 });
        });

        // Wait for the board game list to be refreshed
        await waitFor(() => {
            expect(getBoardGames).toHaveBeenCalledTimes(2);
        });
    });

    test('handles deleting a board game', async () => {

        // Wait for the board games to be fetched and rendered
        await waitFor(() => {
            expect(screen.getByText('Catan')).toBeInTheDocument();
        });

        // Mock window.confirm to automatically confirm deletion
        jest.spyOn(window, 'confirm').mockImplementation(() => true);

        // Click "Delete" button for the first board game
        fireEvent.click(screen.getAllByText('Delete')[0]);

        // Wait for deleteBoardGame to be called
        await waitFor(() => {
            expect(deleteBoardGame).toHaveBeenCalledWith(1);
        });

        // Wait for the board game list to be refreshed
        await waitFor(() => {
            expect(getBoardGames).toHaveBeenCalledTimes(2);
        });

        // Clean up the mock
        window.confirm.mockRestore();
    });
});
