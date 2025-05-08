const WAREHOUSE_API_URL = 'http://boardgame-inventory-env-4.eba-9ddwy6jr.us-east-1.elasticbeanstalk.com:8080/api/warehouses';
//const WAREHOUSE_API_URL = 'http://localhost:8080/api/warehouses';
// GET request
export const getWarehouses = async ()=>{
    const response = await fetch(WAREHOUSE_API_URL);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

//POST request to create new warehouse
export const createWarehouse = async (warehouse) => {
    const response = await fetch(WAREHOUSE_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(warehouse),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

// DELETE request to delete a warehouse by ID
export const deleteWarehouse = async (id) => {
    console.log("deleting: " + id)
    const response = await fetch(`${WAREHOUSE_API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
};