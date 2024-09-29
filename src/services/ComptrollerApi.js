// eslint-disable-next-line no-undef
const baseUrl = process.env.NODE_ENV === 'production' ? process.env.COMPTROLLER_API_URL_PROD : process.env.COMPTROLLER_API_URL_LOCAL;

const API_URL = `${baseUrl}/api/taxreports`; 

const fetchComptrollerData = async (apiUrl = API_URL, httpMethod = 'GET', dataToSend = '') => {
  const token = localStorage.getItem('userToken'); // Retrieve token from localStorage

  const headers = {
    'Authorization': `Bearer ${token}`, // Add JWT to Authorization header
    'Content-Type': 'application/json', // Optional: Set content type
   
  };  

  try {
    let request = {
      method: httpMethod,
      headers: headers,
    }
    if (httpMethod === 'POST' || httpMethod === 'PUT') {
      request.body = JSON.stringify(dataToSend)
    }
    const response = await fetch(apiUrl, request);

    if (!response.ok) {
      if (response.status === 401) {
        // Handle token expiration or unauthorized access
        console.error('Token expired or unauthorized. Redirecting to login...');
        // Optionally redirect to login page or refresh token
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Parse the JSON response
    return data;
  } catch (error) {
    console.error('Error fetching comptroller data:', error);
  }
}

export const getAllTaxReports = async () => {
  try {
    const data = await fetchComptrollerData();
    return data;
  } catch (error) {
    console.error('Error fetching Comptroller data:', error);
    throw error;
  }
};

export const updateTaxReport = async (report) => {
  try {
    const apiUrl = `${API_URL}/${report.id}`
    const data = await fetchComptrollerData(apiUrl, 'PUT', report);
    return data;
  } catch (error) {
    console.error('Error updating Comptroller data:', error);
    throw error;
  }
};

// creating a new report
export const createTaxReport = async (newReport) => {
  try {
    const data = await fetchComptrollerData(API_URL, 'POST', newReport)
    return data;
  } catch (error) {
    console.error('Error creating Comptroller data:', error);
    throw error;
  }
}

export const deleteTaxReport = async (reportId) => {
  try {
    const data = await fetchComptrollerData(`${API_URL}/${reportId}`, 'DELETE');
    return data;
  } catch (error) {
    console.error('Error deleting Comptroller data:', error);
    throw error;
  }
}