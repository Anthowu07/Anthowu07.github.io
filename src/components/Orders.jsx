import React, { useState, useEffect } from 'react';
import { createOrder } from '../services/orderApi'; // Service for handling orders
import { getBoardGames } from '../services/boardgameApi'; // Service for fetching board games
import { getWarehouses } from '../services/warehouseApi'; // Service for fetching warehouses
import './Orders.css'; // For styling

const Orders = () => {
    const [boardGames, setBoardGames] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [selectedBoardGame, setSelectedBoardGame] = useState('');
    const [selectedWarehouse, setSelectedWarehouse] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(''); // New state for success message

    // Fetch board games for dropdown
    useEffect(() => {
        const fetchBoardGames = async () => {
            try {
                const data = await getBoardGames();
                setBoardGames(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchBoardGames();
    }, []);

    // Fetch warehouses for dropdown
    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const data = await getWarehouses();
                setWarehouses(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchWarehouses();
    }, []);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedBoardGame || !selectedWarehouse) {
            setError('Please select both a board game and a warehouse.');
            return;
        }

        try {
            const order = {
                boardgame_id: selectedBoardGame,
                warehouse_id: selectedWarehouse
            };
            await createOrder(order);
            setSelectedBoardGame('');
            setSelectedWarehouse('');
            setError(null);
            setSuccessMessage('Order Placed!'); // Set success message
        } catch (error) {
            setError(error.message);
            setSuccessMessage(''); // Clear success message on error
        }
    };

    return (
        <div>
            <h2>Place Order</h2>
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>} {/* Display success message */}
            <form id="orders-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="boardgame">Board Game:</label>
                    <select
                        id="boardgame"
                        value={selectedBoardGame}
                        onChange={(e) => setSelectedBoardGame(e.target.value)}
                    >
                        <option value="">Select a board game</option>
                        {boardGames.map(boardgame => (
                            <option key={boardgame.boardgame_id} value={boardgame.boardgame_id}>
                                {boardgame.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="warehouse">Warehouse:</label>
                    <select
                        id="warehouse"
                        value={selectedWarehouse}
                        onChange={(e) => setSelectedWarehouse(e.target.value)}
                    >
                        <option value="">Select a warehouse</option>
                        {warehouses.map(warehouse => (
                            <option key={warehouse.warehouse_id} value={warehouse.warehouse_id}>
                                {warehouse.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button id="submit-form-button" type="submit">Create Order</button>
            </form>
        </div>
    );
};

export default Orders;
