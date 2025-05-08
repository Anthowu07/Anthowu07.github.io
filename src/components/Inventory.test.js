import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import InventoryList from './Inventory';
import { getInventory, deleteInventory, updateInventory } from '../services/inventoryApi';

// Mock the API calls
jest.mock('../services/inventoryApi');

const mockInventory = [
    {
        inventory_id: 1,
        boardgame: { name: 'Catan', publisher: 'Kosmos' },
        quantity_available: 5,
        warehouse: { name: 'Warehouse' }
    },
    {
        inventory_id: 2,
        boardgame: { name: 'Ticket to Ride', publisher: 'Days of Wonder' },
        quantity_available: 20,
        warehouse: { name: 'Warehouse' }
    },
];

beforeEach(() => {
    getInventory.mockResolvedValue(mockInventory);
    deleteInventory.mockResolvedValue({});
    updateInventory.mockResolvedValue({});
    render(<InventoryList />);
});

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
});

describe('Inventory List Component', () => {
    //Test page and table render
    test('renders inventory list with fetched data', async () => {

        // Assert that the table headers are rendered
        expect(screen.getByText('Inventory ID')).toBeInTheDocument();
        expect(screen.getByText('Board Game Name')).toBeInTheDocument();
        expect(screen.getByText('Publisher')).toBeInTheDocument();
        expect(screen.getByText('Quantity Available')).toBeInTheDocument();
        expect(screen.getByText('Warehouse Name')).toBeInTheDocument();
        expect(screen.getByText('Actions')).toBeInTheDocument();

        // Wait for inventory entries to be fetched and displayed
        await waitFor(() => {
            expect(screen.getByText('Catan')).toBeInTheDocument();
            expect(screen.getByText('Ticket to Ride')).toBeInTheDocument();
        });
    });

    test('handles editing an inventory entry and the form buttons', async () => {
        

        // Wait for the inventory entries to be fetched and rendered
        await waitFor(() => {
            expect(screen.getByText('Catan')).toBeInTheDocument();
        });

        // Click "Edit" button for the first inventory entry
        fireEvent.click(screen.getAllByText('Edit Quantity')[0]);

        // Check that the form is populated with the inventory entry's data
        expect(screen.getByPlaceholderText('Quantity Available')).toHaveValue(5);

        // Update the form and submit
        fireEvent.change(screen.getByPlaceholderText('Quantity Available'), { target: { value: '20' } });
        fireEvent.click(screen.getByText('Update'));

        // Check that updateInventory was called
        expect(updateInventory).toHaveBeenCalledWith({
            inventory_id: 1,
            boardgame: { name: 'Catan', publisher: 'Kosmos' },
            name: "Catan",
            publisher: "Kosmos",
            quantity_available: "20",
            warehouse: { name: 'Warehouse' }
        });

        // Wait for the inventory entries list to be refreshed
        await waitFor(() => {
            expect(getInventory).toHaveBeenCalledTimes(2);
        });

        // Test the cancel button
        // Click the "Edit Quantity" button for the first inventory item
        fireEvent.click(screen.getAllByText('Edit Quantity')[0]);

        // The form should now be visible
        expect(screen.getByText('Editing quantity of Catan in the Warehouse Warehouse')).toBeInTheDocument();

        // Click the "Cancel" button
        fireEvent.click(screen.getByText('Cancel'));

        // The form should no longer be visible
        expect(screen.queryByText('Editing quantity of Catan in the Warehouse Warehouse')).not.toBeInTheDocument();
    });

    test('handles deleting an inventory entry', async () => {
        // Wait for the board games to be fetched and rendered
        await waitFor(() => {
            expect(screen.getByText('Catan')).toBeInTheDocument();
        });

        // Mock window.confirm to automatically confirm deletion
        jest.spyOn(window, 'confirm').mockImplementation(() => true);

        // Click "Delete" button for the first inventory
        fireEvent.click(screen.getAllByText('Delete')[0]);

        // Wait for deleteBoardGame to be called
        await waitFor(() => {
            expect(deleteInventory).toHaveBeenCalledWith(1);
        });

        // Wait for the board game list to be refreshed
        await waitFor(() => {
            expect(getInventory).toHaveBeenCalledTimes(2);
        });

        // Clean up the mock
        window.confirm.mockRestore();
    });
});