import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchJoinTableData } from '../services/joinTableApi';
import './BoardGames.css';

const JoinTable = () => {
  const { id } = useParams();
  const [joinTableData, setJoinTableData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJoinTableData = async () => {
      try {
        const data = await fetchJoinTableData(id);
        setJoinTableData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    loadJoinTableData();
  }, [id]);

  return (
    <div className="container">
      <h2 id="join-table-header">Board Games in Warehouse</h2>
      {error && <div>Error: {error}</div>}
      <table>
        <thead>
          <tr>
            <th>Board Game Name</th>
            <th>Quantity in Stock</th>
          </tr>
        </thead>
        <tbody>
          {joinTableData.map((inventory) => (
            <tr key={inventory.inventory_id}>
              <td>{inventory.boardgame.name}</td>
              <td>{inventory.quantity_available}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JoinTable;
