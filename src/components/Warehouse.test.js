import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import WarehouseList from './Warehouses';  // Fixed the import path
import { getWarehouses, createWarehouse, deleteWarehouse } from '../services/warehouseApi';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock the API module
jest.mock('../services/warehouseApi');

// Mock data
const mockWarehouses = [
    { warehouse_id: 1, name: 'Warehouse 1', capacity: 100, num_items: 10 },
    { warehouse_id: 2, name: 'Warehouse 2', capacity: 200, num_items: 20 },
];

describe('WarehouseList Component', () => {
    // Setup before each test
    beforeEach(async () => {
        // Mock API responses
        getWarehouses.mockResolvedValue(mockWarehouses);
        createWarehouse.mockResolvedValue({});
        deleteWarehouse.mockResolvedValue({});

        //Renders the page
        await act(async () => {
            render(
                <Router>
                    <WarehouseList />
                </Router>
            );
        });
    });

    // Teardown after each test
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    test('renders the warehouse grid', async () => {

        // Check initial render
        expect(screen.getByText('Add Warehouse')).toBeInTheDocument();

        // Check that existing warehouses are rendered
        await waitFor(() => {
            expect(screen.getByText('Warehouse 1')).toBeInTheDocument();
            expect(screen.getByText('Warehouse 2')).toBeInTheDocument();
        });
    });

    test('handles adding a new warehouse', async () => {

        // Open the form
        act(() => {
            fireEvent.click(screen.getByText('Add Warehouse'));
        });

        // Check that the form fields are displayed
        expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Capacity')).toBeInTheDocument();

        // Simulate form input and submission
        act(() => {
            fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'New Warehouse' } });
            fireEvent.change(screen.getByPlaceholderText('Capacity'), { target: { value: '300' } });
            fireEvent.click(screen.getByText('Create Warehouse'));
        });

        // Check that createWarehouse was called
        expect(createWarehouse).toHaveBeenCalledWith({ name: 'New Warehouse', capacity: '300', num_items: 0 });

        // Update the mock to include the new warehouse
        getWarehouses.mockResolvedValue([
            ...mockWarehouses,
            { warehouse_id: 3, name: 'New Warehouse', capacity: 300, num_items: 0 }
        ]);

        // Wait for the new warehouse to appear
        await waitFor(() => {
            expect(screen.getByText('New Warehouse')).toBeInTheDocument();
        });

        // Check that the form is hidden after submission
        expect(screen.queryByPlaceholderText('Name')).not.toBeInTheDocument();
        expect(screen.queryByPlaceholderText('Capacity')).not.toBeInTheDocument();
    });

    test('handles the delete action', async () => {

        // Mock the deleteWarehouse function
        deleteWarehouse.mockImplementation(() => Promise.resolve());

        // Ensure we have at least one warehouse to delete
        expect(screen.getByText('Warehouse 1')).toBeInTheDocument();

        // Mock window.confirm to automatically confirm deletion
        jest.spyOn(window, 'confirm').mockImplementation(() => true);

        // Simulate the delete action
        act(() => {
            fireEvent.click(screen.getAllByText('Delete')[0]);
        });

        // Check that deleteWarehouse was called
        expect(deleteWarehouse).toHaveBeenCalledWith(1);

        // Check that the warehouse is removed from the list
        await waitFor(() => {
            expect(screen.queryByText('Warehouse 1')).not.toBeInTheDocument();
        });

        // Clean up the mock
        window.confirm.mockRestore();
    });
});
