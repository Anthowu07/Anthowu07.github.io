export const fetchJoinTableData = async (id) => {
    try {
      const response = await fetch(`https://boardgameinventory-backend-production.up.railway.app/api/warehouses/${id}/inventories`);
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
  