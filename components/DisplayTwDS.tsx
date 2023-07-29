import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

import Profile from './profile';

interface UserData {
  discord: string | null;
  twitter: string | null;
  email: string | null;
  wallet: string;
  createdat: string;
  pine_holder: boolean;
}

const DisplayTwDs: React.FC = () => {
  // state variables
  const { address, isConnected } = useAccount();
  const [inDatabase, setInDatabase] = useState<boolean | null>(true)

  const [twitter, setTwitter] = useState<string | null>(null)
  const [discord, setDiscord] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [pineHolder, setPineHolder] = useState<boolean | null>(true)
  const [score, setScore] = useState<number | null>(null); // added score state variable

  const apiURL = 'https://api.flipsidecrypto.com/api/v2/queries/235a1bde-fd3d-4ab9-a887-c1f13d026e8d/data/latest';

  // Retrieves twitter and discord data (If in DB) upon connecting. 
  useEffect(() => {
    const getWalletData = async () => {
      try {
        if (isConnected && address) {
          const response = await fetch(`/api/getWalletData?wallet=${address}`);
          const data: UserData[] = await response.json();
          if (data.length > 0) {
            setTwitter(data[0].twitter);
            setDiscord(data[0].discord); 
            setPineHolder(data[0].pine_holder); 
            setEmail(data[0].email); 
            
          }
          else {
            setInDatabase(false); 
          } 

          // Fetch score from API
          const responseScore = await fetch(apiURL);
          if (!responseScore.ok) {
            throw new Error('Network response was not ok');
          }
          const dataScore = await responseScore.json();
          const holderData = dataScore.find((holder: { HOLDER: string }) => holder.HOLDER.toLowerCase() === address.toLowerCase());

          if (holderData) {
            setScore(holderData.SCORE);
          }

        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    getWalletData();
  }, [isConnected, address]);

  if (!inDatabase) {
    return <div>You must log your information to the database</div>;
  }

  return (
    <div className="card-body pb-5">
      <div className="d-flex justify-content-between align-items-center">
        <a href="#" className="avatar w-20 h-20 border border-body border-4 rounded-circle ">
          <img alt="..." src="/jackthepine_green_pine_sapling_in_a_lush_forest_digital_art_bru_fa6c8d1e-08fb-4012-8ffb-f3d21e1772b4.png" className="rounded-circle"  />
        </a>
        <div className="text-end">
          <a href="#" className="btn btn-sm btn-primary d-block d-md-inline-block ms-auto ms-md-0">Edit Profile</a>
        </div>
      </div>
      <div className="mt-6">
        <h6 className="mb-2">Pine Profile:</h6>
        <p className="text-sm text-muted">Twitter: {twitter} </p>
        <p className="text-sm text-muted">Email: {email} </p>
        <p className="text-sm text-muted">Discord: {discord} </p>
        <p className="text-sm text-muted">Pine Holder: {pineHolder === true ? 'True' : pineHolder === false ? 'False' : 'Null'} </p>
      </div>
      <hr className="my-5" /> {/* EDIT SIZING HERE */}
      <div className="text-end">
        <a href="#" className="lh-none text-heading text-primary-hover text-sm font-semibold">
          <h6 className="badge bg-soft-success text-success" style={{ fontSize: '13px' }}>Score: {score} </h6>
        </a>
      </div>
    </div>
  );
};

export default DisplayTwDs;



  /*
  return (
    // Row
    <div className="row g-0">

      <div className="col-auto">
        <a href="#" className="avatar w-20 h-20 border border-body border-4 rounded-circle ">
          <img alt="..." src="/jackthepine_green_pine_sapling_in_a_lush_forest_digital_art_bru_fa6c8d1e-08fb-4012-8ffb-f3d21e1772b4.png" className="rounded-circle"  />
        </a>
        
      </div>

      <div className="col ps-4 pt-4">
        <h6 className="text-xs text-uppercase text-muted mb-1">Pine Profile</h6>
        <h3 className="h5">{twitter}</h3> 
      </div>

      <div className="col-12 col-md-auto mt-2 mt-md-0 mb-md-3 hstack gap-2 mt-4 mt-sm-0">
        
        <a href="#" className="btn btn-sm btn-primary d-block d-md-inline-block ms-auto ms-md-0">Edit Profile</a>
      </div>

      <div className="mt-3"> 
        <h3 className="h5">Discord: {discord}</h3> 
      </div>
    </div>
);

*/






