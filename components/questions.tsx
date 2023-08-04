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
              <li className="nav-item" key={index}>
                  <a className="nav-link py-2" href={`https://metricsdao.xyz/app/market/0x496804C528146315E136570daAAC5A1509F739e3/request/${item.REQUEST_ID}`} target="_blank" rel="noopener noreferrer" title={`Submit by: ${formatDate(item.SUBMISSION_EXPIRATION)}\nReview by: ${formatDate(item.SIGNAL_EXPIRATION)}`}>
                    <span className="text-success me-2">●</span>
                      Live Question <span className="badge bg-soft-danger text-danger" style={{fontSize: "12px", marginLeft: "5px"}}>#{index + 1}</span>
                  </a>
              </li>
          ))}
      </div>
    );
    
    
};


export default Questions;

  
  