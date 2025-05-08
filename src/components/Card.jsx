import React from 'react';
import './Card.css'
import { Link } from 'react-router-dom';
import { deleteWarehouse } from '../services/warehouseApi';

const Card = ({ warehouse, onDelete }) => {
  const handleDelete = async () => {
    // Show confirmation dialog with a message about cascading deletes
    const userConfirmed = window.confirm(
      'Are you sure you want to delete this warehouse? All associated inventory will also be deleted.'
    );
    if (userConfirmed) {
      try {
        await deleteWarehouse(warehouse.warehouse_id); // Call the API to delete
        onDelete(warehouse.warehouse_id); // Notify parent component to remove the card
      } catch (error) {
        console.error('Error deleting warehouse:', error);
      }
    }

  };
  return (

    <div className="card">
      <div className="container">
        <h2><b>{warehouse.name}</b></h2>
        <p>Number of Items: {warehouse.num_items}</p>
        <p>Capacity: {warehouse.capacity}</p>
        <Link to={`/warehouses/${warehouse.warehouse_id}/inventories`} id='view_inventory_button'>View Inventory</Link>
        <button className="delete-button" onClick={handleDelete} id='delete_button'>Delete</button>
      </div>
    </div>
  );
}

export default Card;