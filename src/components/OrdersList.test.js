import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrdersList from './OrdersList';
import { getOrders } from "../services/orderApi";

// Mock the API calls
jest.mock('../services/orderApi');

const mockOrders = [
    {
        "order_id": 1,
        "boardgame": {
          "boardgame_id": 1,
          "name": "Catan",
          "publisher": "Kosmos",
          "reorder_quantity": 5
        },
        "warehouse": {
          "warehouse_id": 1,
          "name": "Warehouse",
          "capacity": 1230,
          "num_items": 60
        },
        "quantity": 10,
        "date": "2024-08-22"
      },
      {
        "order_id": 2,
        "boardgame": {
          "boardgame_id": 2,
          "name": "Ticket to Ride",
          "publisher": "Days of Wonder",
          "reorder_quantity": 10
        },
        "warehouse": {
          "warehouse_id": 1,
          "name": "Warehouse",
          "capacity": 1230,
          "num_items": 60
        },
        "quantity": 20,
        "date": "2024-08-22"
      },
];

beforeEach(() => {
    getOrders.mockResolvedValue(mockOrders);
    render(<OrdersList />);
});

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
});

describe('Orders List Component', () => {
    test('renders orders list with fetched data', async () => {

        // Assert that the table headers are rendered
        expect(screen.getByText('Order ID')).toBeInTheDocument();
        expect(screen.getByText('Board Game Name')).toBeInTheDocument();
        expect(screen.getByText('Warehouse Name')).toBeInTheDocument();
        expect(screen.getByText('Quantity Ordered')).toBeInTheDocument();
        expect(screen.getByText('Date Submitted')).toBeInTheDocument();

        // Wait for orders to be fetched and displayed
        await waitFor(() => {
            expect(screen.getByText('Catan')).toBeInTheDocument();
            expect(screen.getByText('Ticket to Ride')).toBeInTheDocument();
        });
    });
});
