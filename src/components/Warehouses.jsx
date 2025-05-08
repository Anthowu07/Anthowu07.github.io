import React, { useEffect, useState } from 'react';
import { getWarehouses, createWarehouse, deleteWarehouse } from '../services/warehouseApi';
import Card from './Card';
import './Warehouse.css';

const WarehouseList = () => {
    const [warehouses, setWarehouse] = useState([]);
    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [num_items, setNum_Items] = useState('');
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false); // State to control form visibility

    // Handle GET Request
    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const data = await getWarehouses();
                setWarehouse(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchWarehouses();
    }, []);

    // Handle POST Request
    const handleCreateWarehouse = async () => {
        const newWarehouse = { name, capacity, num_items: 0 };
        try {
            await createWarehouse(newWarehouse);
            const data = await getWarehouses();
            setWarehouse(data);
            setShowForm(false); // Hide form after creation
            setName('');
            setCapacity(0);
            setNum_Items(0);
        } catch (error) {
            setError(error.message);
        }
    };

    // Handle DELETE Request
    const handleDeleteWarehouse = (id) => {
        console.log("deleting: " + id)
        setWarehouse(warehouses.filter(warehouse => warehouse.warehouse_id !== id));
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="warehouse-container">
            <button onClick={toggleForm} className="add-warehouse-button" id='toggle-form-button'>
                {showForm ? 'Cancel' : 'Add Warehouse'}
            </button>
            {showForm && (
                <div className="form-container">
                    <h2>Add Warehouse</h2>
                    <input
                        type="text"
                        id='name-field'
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="number"
                        id="capacity-field"
                        placeholder="Capacity"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                    />
                    <button id='submit-form-button' onClick={handleCreateWarehouse}>Create Warehouse</button>
                </div>
            )}
            {error && <div>Error: {error}</div>}
            <div className="cards" id='warehouses-grid'>
                {warehouses.map((warehouse) => (
                    <Card
                    key={warehouse.warehouse_id}
                    warehouse={warehouse}
                    onDelete={handleDeleteWarehouse}
                />
                ))}
            </div>
        </div>
    );
};

export default WarehouseList;
