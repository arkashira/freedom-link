import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Stats() {
  const [dataUsage, setDataUsage] = useState({
    uploaded: 0,
    downloaded: 0,
    total: 0,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data-usage');
        setDataUsage(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Data Usage Statistics</h2>
      <p>Uploaded: {dataUsage.uploaded} bytes</p>
      <p>Downloaded: {dataUsage.downloaded} bytes</p>
      <p>Total: {dataUsage.total} bytes</p>
    </div>
  );
}

export default Stats;