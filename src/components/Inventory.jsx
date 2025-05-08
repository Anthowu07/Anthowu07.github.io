import React, { useEffect, useState } from 'react';
import { getInventory, deleteInventory, updateInventory } from '../services/inventoryApi';
import './Inventory.css'

const InventoryList = () => {
    const [inventory, setInventory] = useState([]);
    const [name, setName] = useState('');
    const [warehouseName, setWarehouseName] = useState('');
    const [quantity_available, setQuantity_Available] = useState('');
    const [editing, setEditing] = useState(false);
    const [publisher, setPublisher] = useState('');
    const [currentInventory, setCurrentInventory] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState(null);

    // Handle GET Request
    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const data = await getInventory();
                setInventory(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchInventory();
    }, []);

    // Handle DELETE Request
    const handleDeleteInventory = async (inventory_id) => {
        const userConfirmed = window.confirm('Are you sure you want to delete this inventory?');
        if (userConfirmed) {
            try {
                await deleteInventory(inventory_id);
                const data = await getInventory();
                setInventory(data);
            } catch (error) {
                setError(error.message);
            }
        }
    };

    // Handle EDIT Request
    const handleEditInventory = (inventory) => {
        setEditing(true);
        setCurrentInventory(inventory);
        setName(inventory.boardgame.name);
        setWarehouseName(inventory.warehouse.name);
        setPublisher(inventory.boardgame.publisher);
        setQuantity_Available(inventory.quantity_available);
        setShowForm(true); // Show form when editing
    };

    const handleUpdateInventory = async () => {
        const updatedInventory = { ...currentInventory, name, publisher, quantity_available };
        try {
            await updateInventory(updatedInventory);
            const data = await getInventory();
            setInventory(data);
            setEditing(false);
            setCurrentInventory({});
            setName('');
            setWarehouseName('');
            setPublisher('');
            setQuantity_Available(0);
            setShowForm(false); // Hide form after updating
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleForm = () => {
        setEditing(false);
        setShowForm(!showForm);
        setName('');
        setWarehouseName('');
        setPublisher('');
        setQuantity_Available('');
    };

    return (
        <div className="container">
            <h2>Inventory Data</h2>
            {error && <div>Error: {error}</div>}
            {showForm && (
                <div className="form-container">
                    <h2>Edit Inventory</h2>
                    <span>Editing quantity of {name} in the {warehouseName} Warehouse</span>
                    <input
                        type="number"
                        id="quantity-field"
                        placeholder="Quantity Available"
                        value={quantity_available}
                        onChange={(e) => setQuantity_Available(e.target.value)}
                    />
                    <button id="submit-form-button" onClick={handleUpdateInventory}>
                        {'Update'}
                    </button>
                    <button id="cancel-form-button" onClick={toggleForm}>
                        {'Cancel'}
                    </button>
                </div>
            )}
            <table id="inventory-table">
                <thead>
                    <tr>
                        <th>Inventory ID</th>
                        <th>Board Game Name</th>
                        <th>Publisher</th>
                        <th>Quantity Available</th>
                        <th>Warehouse Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="inventory-table-body">
                    {inventory.map((inventory) => (
                        <tr id="inventory-table-row" key={inventory.inventory_id}>
                            <td id="inventory-id">{inventory.inventory_id}</td>
                            <td id="board-game-name">{inventory.boardgame.name}</td>
                            <td id="board-game-publisher">{inventory.boardgame.publisher}</td>
                            <td id="quantity-available">{inventory.quantity_available}</td>
                            <td id="warehouse-name">{inventory.warehouse.name}</td>
                            <td>
                                <button id="delete-button" onClick={() => handleDeleteInventory(inventory.inventory_id)}>Delete</button>
                                <button id="edit-button" onClick={() => handleEditInventory(inventory)}>Edit Quantity</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryList;
