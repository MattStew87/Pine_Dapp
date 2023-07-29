import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

import Profile from './profile';

interface UserData {
  discord: string | null;
  twitter: string | null;
  wallet: string;
  createdat: string;
  pine_holder: boolean;
}

const DisplayTwDs: React.FC = () => {
  // state varaibles
  const { address, isConnected } = useAccount();
  const [twitter, setTwitter] = useState<string | null>(null)
  const [discord, setDiscord] = useState<string | null>(null)
  const [pineHolder, setPineHolder] = useState<boolean | null>(true)
  const [inDatabase, setInDatabase] = useState<boolean | null>(true)
 
  
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
            console.log(pineHolder)
            
          }
          else {
            setInDatabase(false); 
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

  /*
  return (
    <div style={{ position: 'relative', maxWidth: '400px', margin: '0 auto', textAlign: 'left' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Profile</h2>
        
        <button className="btn btn-sm btn-neutral">
          Edit Profile
        </button>
      </div>
      <Profile />
      <p><strong>Twitter:</strong> {twitter}</p>
      <p><strong>Discord:</strong> {discord}</p>
    </div>
  );

  */

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
      <p className="text-sm text-muted">Discord: {discord} </p>
      <p className="text-sm text-muted">Pine Holder: {pineHolder ? 'True' : 'False'}  </p>
      <p className="text-sm text-muted">Additional text row 3.</p>
      <p className="text-sm text-muted">Additional text row 4.</p>
    </div>
    <hr className="my-5" />
    <div className="text-end">
      <a href="#" className="lh-none text-heading text-primary-hover text-sm font-semibold">
        <i className="bi bi-gear-fill me-2 text-muted" />Settings
      </a>
    </div>
  </div>
);

    
  
 
  

};

export default DisplayTwDs;



