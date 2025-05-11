const BASE_URL = 'https://boardgameinventory-backend-production.up.railway.app';
const BOARDGAME_API_URL = `${BASE_URL}/api/boardgames`;
//const BOARDGAME_API_URL = 'http://localhost:8080/api/boardgames';

export const getBoardGames = async () => {
    const response = await fetch(BOARDGAME_API_URL);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const createBoardGame = async (boardgame) => {
    const response = await fetch(BOARDGAME_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(boardgame),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const deleteBoardGame = async (id) => {
    const response = await fetch(`${BOARDGAME_API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
};

export const updateBoardGame = async (boardgame) => {
    const response = await fetch(`${BOARDGAME_API_URL}/${boardgame.boardgame_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(boardgame),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};