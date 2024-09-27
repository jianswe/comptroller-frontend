import React, { useState, useEffect } from 'react';
import { getComptrollerData, updateComptrollerData } from '../services/ComptrollerApi';

const ComptrollerData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getComptrollerData();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      const newData = { /* put the updated data structure here */ };
      await updateComptrollerData(newData);
      alert('Data updated successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Comptroller Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={handleUpdate}>Update Data</button>
    </div>
  );
};

export default ComptrollerData;
