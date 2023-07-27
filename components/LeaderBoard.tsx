import React, { useEffect, useState, useCallback } from 'react';
import LeaderBoardProfile from './LeaderBoardProfile';

const apiURL = 'https://api.flipsidecrypto.com/api/v2/queries/235a1bde-fd3d-4ab9-a887-c1f13d026e8d/data/latest';

const LeaderBoard: React.FC = () => {
  const [holders, setHolders] = useState<{ HOLDER: string; SCORE: number }[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setHolders(data);
    } catch (error) {
      console.error('Error fetching data from API:', error);
      setError((error as Error).message);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const displayedHolders = holders.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  return (
    <div>
      <table className="table table-hover table-nowrap">
        <thead className="table-light">
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Holder</th>
            <th scope="col">Score</th>
            <th scope="col">Pine NFT</th>
          </tr>
        </thead>
        <tbody>
          {displayedHolders.map((holder, index) => (
            <tr key={holder.HOLDER}>
              <td>
                {index + 1 + currentPage * rowsPerPage}
              </td>
              <td onClick={() => copyToClipboard(holder.HOLDER)} style={{cursor: 'pointer'}}>
                <span className="badge rounded-pill bg-soft-success text-success">{holder.HOLDER}</span>
              </td>
              <td>{holder.SCORE}</td>
              <td><LeaderBoardProfile holderAddress={holder.HOLDER} delay={index * 200} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button className="btn btn-sm btn-neutral" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0}>See previous</button>
        <button className="btn btn-sm btn-neutral" onClick={() => setCurrentPage(currentPage + 1)} disabled={(currentPage + 1) * rowsPerPage >= holders.length}>See next</button>
      </div>
      <div className="card-footer border-0 py-5">
        <span className="text-muted text-sm">Showing {(currentPage * rowsPerPage) + 1} - {Math.min((currentPage + 1) * rowsPerPage, holders.length)} of {holders.length} are currently shown</span>
      </div>
    </div>
  );
}

export default LeaderBoard;
