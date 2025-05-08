import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Orders from './Orders';
import { createOrder } from '../services/orderApi';
import { getBoardGames } from '../services/boardgameApi';
import { getWarehouses } from '../services/warehouseApi';

// Mock the API calls
jest.mock('../services/orderApi');
jest.mock('../services/boardgameApi');
jest.mock('../services/warehouseApi');

//Mock Data
const mockBoardGames = [
    { boardgame_id: 1, name: 'Catan'},
    { boardgame_id: 2, name: 'Ticket to Ride'},
];
const mockWarehouses = [
    { warehouse_id: 1, name: 'Warehouse A'},
    { warehouse_id: 2, name: 'Warehouse B'},
];

beforeEach(() => {
    createOrder.mockResolvedValue({});
    getBoardGames.mockResolvedValue(mockBoardGames);
    getWarehouses.mockResolvedValue(mockWarehouses);
    render(<Orders />);
});

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
});

describe('Place Order Form', () => {
    //Checks for proper render
    test('renders form correctly', async () => {
        // Wait for the dropdowns to be populated
        await waitFor(() => {
            expect(screen.getByText('Catan')).toBeInTheDocument();
            expect(screen.getByText('Warehouse A')).toBeInTheDocument();
        });

        // Check that the form elements are rendered
        expect(screen.getByLabelText(/board game/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/warehouse/i)).toBeInTheDocument();
        expect(screen.getByText(/create order/i)).toBeInTheDocument();
    });

    //Checks for error message
    test('shows error message when form is submitted without selecting board game or warehouse', async () => {
        // Wait for the button to render
        await waitFor(() => {
            expect(screen.getByText(/create order/i)).toBeInTheDocument();
        });

        // Submit the form without selecting anything
        fireEvent.click(screen.getByText(/create order/i));

        // Check that the error message is displayed
        expect(await screen.findByText('Please select both a board game and a warehouse.')).toBeInTheDocument();
    });

    //Tests placing an order
    test('shows success message when order is created successfully', async () => {

        // Wait for the button to render
        await waitFor(() => {
            expect(screen.getByText(/create order/i)).toBeInTheDocument();
        });

        // Select a board game and a warehouse
        fireEvent.change(screen.getByLabelText(/board game/i), { target: { value: 1 } });
        fireEvent.change(screen.getByLabelText(/warehouse/i), { target: { value: 1 } });

        // Submit the form
        fireEvent.click(screen.getByText(/create order/i));

        // Check that the success message is displayed
        expect(await screen.findByText('Order Placed!')).toBeInTheDocument();

        // Check that the form fields are reset
        expect(screen.getByLabelText(/board game/i).value).toBe('');
        expect(screen.getByLabelText(/warehouse/i).value).toBe('');
    });
});