export const fetchJoinTableData = async (id) => {
    try {
      const response = await fetch(`http://boardgame-inventory-env-4.eba-9ddwy6jr.us-east-1.elasticbeanstalk.com:8080/api/warehouses/${id}/inventories`);
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
  