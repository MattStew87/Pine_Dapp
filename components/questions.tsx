import { useEffect, useState } from 'react';

interface IData {
    REQUEST_ID: string;
    SUBMISSION_EXPIRATION: string;
    SIGNAL_EXPIRATION: string;
    // Include other properties as needed
  }
  
  const Questions = () => {
    const [data, setData] = useState<IData[]>([]);
  
    useEffect(() => {
      fetch('https://api.flipsidecrypto.com/api/v2/queries/cb11321f-7847-4ef0-b7d4-a5e041ba135d/data/latest')
        .then(response => response.json())
        .then(data => {
          setData(data);
        });
    }, []);
  
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    };
  
    return (
      <div>
        {data.map((item, index) => (
          <a key={index} href={`https://metricsdao.xyz/app/market/0x496804C528146315E136570daAAC5A1509F739e3/request/${item.REQUEST_ID}`} target="_blank" rel="noopener noreferrer">
            <button className="btn btn-sm btn-neutral" >
              Submit Deadline: {formatDate(item.SUBMISSION_EXPIRATION)} (ET) <br />
              Review Deadline: {formatDate(item.SIGNAL_EXPIRATION)} (ET)
            </button>
          </a>
        ))}
      </div>
    );
  };
  
  export default Questions;
  
  
  