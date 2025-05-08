const ORDER_API_URL = 'http://boardgame-inventory-env-4.eba-9ddwy6jr.us-east-1.elasticbeanstalk.com:8080/api/orders';
//const ORDER_API_URL = 'http://localhost:8080/api/orders';

export const getOrders = async () => {
    const response = await fetch(ORDER_API_URL);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const createOrder = async (order) => {
    const response = await fetch(ORDER_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    });
    if (!response.ok) {
        throw new Error('Error: Order would put warehouse over capacity');
    }
    return await response.json();
};
