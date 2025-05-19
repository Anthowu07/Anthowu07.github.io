// `https://boardgameinventory-backend-production.up.railway.app/api/warehouses/${id}/inventories`
// `http://localhost:8080/api/warehouses/${id}/inventories`

export const fetchJoinTableData = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/warehouses/${id}/inventories`);
      if (!response.ok) {
        console.error('Network response was not ok:', response.statusText);
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };
  