const INVENTORY_API_URL = 'http://boardgame-inventory-env-4.eba-9ddwy6jr.us-east-1.elasticbeanstalk.com:8080/api/inventory';
//const INVENTORY_API_URL = 'http://localhost:8080/api/inventory';

export const getInventory = async ()=>{
    const response = await fetch(INVENTORY_API_URL);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const createInventory = async (inventory) => {
    const response = await fetch(INVENTORY_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(inventory),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const deleteInventory = async (id) => {
    const response = await fetch(`${INVENTORY_API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
};

export const updateInventory = async (inventory) => {
    const response = await fetch(`${INVENTORY_API_URL}/${inventory.inventory_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(inventory),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};