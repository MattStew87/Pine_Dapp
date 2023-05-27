// Import necessary hooks and components from React
import React, { useEffect, useState, useCallback, useMemo } from 'react';


// Define the updated API URL for fetching the holders and their scores
const apiURL = 'https://api.flipsidecrypto.com/api/v2/queries/235a1bde-fd3d-4ab9-a887-c1f13d026e8d/data/latest';

// Define the LeaderBoard component
const LeaderBoard: React.FC = () => {
  
  // Update state variable to hold an array of objects,
  // each containing a HOLDER and SCORE
  const [holders, setHolders] = useState<{ HOLDER: string; SCORE: number }[]>([]);
  // State variable for error messages
  const [error, setError] = useState<null | string>(null);

  // Define the fetchData function to fetch data from the updated API
  const fetchData = useCallback(async () => {
    try {
      // Fetch data from the API
      const response = await fetch(apiURL);

      // If the response is not ok, throw an error
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse the JSON response
      const data = await response.json();

      // Directly set the holder data in state as it already contains HOLDER and SCORE
      setHolders(data);

    } catch (error) {
      // If there's an error, log it to the console and set it in state
      console.error('Error fetching data from API:', error);
      setError((error as Error).message);
    }
  }, []);

  // Use the useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, [fetchData]);


  // Define how the holder data will be rendered
  // Map through the holders and create a table row for each
  const renderHolders = useMemo(() => {
    return holders.map((holder, index) => (
      // Use the index as the rank, display HOLDER and SCORE
      <tr key={holder.HOLDER}>
        <td>{index + 1}</td>
        <td>{holder.HOLDER}</td>
        <td>{holder.SCORE}</td>
      </tr>
    ));
  }, [holders]);

  // Render the component
  const errorMessage = error ? <div>Error: {error}</div> : null;
  
  const table = (
    <table className="leaderboard-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Holder</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {renderHolders}
      </tbody>
    </table>
  );

  return (
    <div>
      <h2>Holders:</h2>
      {errorMessage || table}
    </div>
  );
}

// Export the LeaderBoard component
export default LeaderBoard;
