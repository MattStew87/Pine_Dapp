import React, { useState, useEffect } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import CreateUserForm from './form'
import Profile_Display from './Profile_Display'

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
  const { openConnectModal } = useConnectModal();

  const [inDatabase, setInDatabase] = useState<boolean | null>(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Displayed variables
  const [twitter, setTwitter] = useState<string | null>(null)
  const [discord, setDiscord] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [pineHolder, setPineHolder] = useState<boolean | null>(null)
  const [score, setScore] = useState<number | null>(null); 

  
  const apiURL = 'https://api.flipsidecrypto.com/api/v2/queries/235a1bde-fd3d-4ab9-a887-c1f13d026e8d/data/latest';

  // Fetch wallet data when isConnected, address, or isModalOpen changes
  useEffect(() => {
    const getWalletData = async () => {
      try {
        if (isConnected && address) {
          const response = await fetch(`/api/getWalletData?wallet=${address}`);
          const data: UserData[] = await response.json();
          if (data.length > 0) {
            setInDatabase(true); 
            setTwitter(data[0].twitter);
            setDiscord(data[0].discord); 
            setPineHolder(data[0].pine_holder); 
            setEmail(data[0].email); 
            
          }
          else {
            
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
  }, [isConnected, address, isModalOpen]);


 

  
  // Displays Users Twitter, Discord, Email, and Pine_Holder Information
  // Allows User to Create/Edit there Profile. 
  return (
    <div className="card-body pb-5 " style={{ height: '100%' }}>
      <div className="d-flex justify-content-between align-items-center">
        <a href="#" className="avatar w-20 h-20 border border-body border-4 rounded-circle ">
          <Profile_Display /> 
        </a>
        <div className="text-end">
          {/* Edit Profile Button*/}
          <a href="#" className="btn btn-sm btn-primary d-block d-md-inline-block ms-auto ms-md-0" 
          style={{ backgroundColor: '#6ECC6E', color: '#FFFFFF', borderColor: '#6ECC6E' }} 
            onClick={() => {
              if (!isConnected) {
                openConnectModal?.();
              } else {
                setIsModalOpen(true);
              }
            }}
          >
             {inDatabase ? 'Edit Profile' : 'Create Profile'}
          </a>
        </div>
      </div>

      {/* Edit Profile Form setup*/}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // This will dim out the rest of the page
          zIndex: 9999, 
        }}>
        
        <div style={{
          backgroundColor: 'white',
          padding: '1em',
          maxWidth: '32%',
          minWidth: '32%',
          maxHeight: '62%',
          minHeight: '62%', 
          overflow: 'auto',
          borderRadius: '10px', // Round the edges
          textAlign: 'center', // Center the text
          display: 'flex', // Use flexbox
          flexDirection: 'column', // Stack the children vertically
          justifyContent: 'center', // Center the children vertically
        }}>
            <CreateUserForm />
            <button onClick={() => setIsModalOpen(false)} style={{
            position: 'absolute', // Position the button absolutely...
            top: '10px', // ...from the top...
            right: '10px', // ...and from the right
            background: 'none', // Remove the default button background...
            border: 'none', // ...and border
            fontSize: '1.5em', // Increase the size of the X
          }}>❌</button> {/* This is the close button */}
          </div>
        </div>
      )}




      <div className="mt-6">
        <h6 className="mb-2">Pine Profile:</h6>
        <p className="text-sm text-muted">Twitter: {twitter} </p>
        <p className="text-sm text-muted">Email: {email} </p>
        <p className="text-sm text-muted">Discord: {discord} </p>
        <p className="text-sm text-muted">Pine Holder: {pineHolder === true ? 'True' : pineHolder === false ? 'False' : ''} </p>
      </div>
      <hr className="my-5" /> {/* EDIT SIZING HERE */}
      <div className="text-end">
        <a href="#" className="lh-none text-heading text-primary-hover text-sm font-semibold">
          <h6 className="badge bg-soft-success text-success" style={{ fontSize: '12px' }}>Score: {score} </h6>
        </a>
      </div>
    </div>
  );

};

export default DisplayTwDs;







