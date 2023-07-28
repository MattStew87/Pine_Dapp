import { useAccount } from 'wagmi'
import {useState, useEffect, useMemo} from 'react';
import { readContract } from '@wagmi/core'

// Pine Badges ABI File
import Badges_ABI from  '../pages/ABI_Folder/Badges.json'
 

// Contract addresses
const Badges_Address = '0xFaA85a0903985bAAF3Ba9EdE37db6b9e325630b7';


const DisplayPineBadges = () => {
  // Hooks
  const { address, isConnected } = useAccount()
  const [tokenInfo, setTokenInfo] = useState<{ [key: string]: { balance: string, imageUrl: string } }>({});

  
  // Roles are static, so we use useMemo for performance optimization
  const roles = useMemo<string[]>(() => ['Pine Challenger', 'Pine Citizen', 'Pine Trailblazer', 'Pine Orator', 'Pine Journalist', 'Pine Pundit'], []);


  // Fetch Pine Badges when isConnected or address changes. 
  useEffect(() => {
    async function fetchData() {
        if (!isConnected) return;

        let info: { [key: string]: { balance: string, imageUrl: string } } = {};

        try {
            for (let i = 0; i < roles.length; i++) {
                const balance = await readContract({
                    address: Badges_Address,
                    abi: Badges_ABI,
                    functionName: 'balanceOf',
                    args: [address, i]
                }) as number;

                const ipfsHash = await readContract({
                    address: Badges_Address,
                    abi: Badges_ABI,
                    functionName: 'uri',
                    args: [i]
                }) as string;

                const ipfsUrl = `https://ipfs.io/ipfs/${ipfsHash}`;
                const response = await fetch(ipfsUrl);
                const metadata = await response.json();
                const imageUrl = metadata.image;

                info[roles[i]] = { balance: balance.toString(), imageUrl };

            }
            setTokenInfo(info);
          } catch (error) {
            console.error('Failed to fetch token info:', error);
          }
    }

    fetchData();
  }, [address, isConnected]);


// Define your grayscale images
const grayscaleImages = [
  "https://badger.mypinata.cloud/ipfs/QmVv6JZSS5qrWz4sXWDR4H2qJXTXW6CMHMXBtEm6RRoYRW",
  "https://badger.mypinata.cloud/ipfs/QmYBoD7vNbgfgrvrfCJZyKxkpE2FRVn1jfnPbMsmeTFyeH",
  "https://badger.mypinata.cloud/ipfs/QmWPKKs4RtXzQWKq6uKxJNEmyTjd23jdAsHjLnyEBkq1d3",
  "https://badger.mypinata.cloud/ipfs/QmZ4fsKdgjsSoZNu8ja6ctLxEX924H21xLAj9owwBfUnTo",
  "https://badger.mypinata.cloud/ipfs/QmXWLAPHQbj9b5Ex3WUmjigJ4ZqsbyRozcGSjYnyQiefGe",
  "https://badger.mypinata.cloud/ipfs/QmRjs6qUvBwkZG7v9aPwTrVABsLJJrxozo9MoZSUoAJnY3"
];

// Pine Badge Information Display 
const renderTokenInfo = (
  <div>
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridGap: '10px'
    }}>
      {isConnected && Object.keys(tokenInfo).length > 0 ? Object.keys(tokenInfo).map((role, index) => (
        <div key={index} className="role-info" style={{ position: 'relative' }}>
          <img 
            src={parseFloat(tokenInfo[role].balance) > 0 ? tokenInfo[role].imageUrl : grayscaleImages[index]} 
            alt={role} 
            className="icon icon-shape rounded-4 bg-secondary bg-opacity-40" 
            style={{width: '100%', height: 'auto', filter: parseFloat(tokenInfo[role].balance) > 0 ? 'none' : 'grayscale(100%)'}}
          />
          <div className="role-text" style={{
            position: 'absolute',
            bottom: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            width: '100%',
            textAlign: 'center',
            opacity: '0',
            transition: 'opacity 0.3s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0'; }}
          >
            <strong>{role}: </strong>
            <span className="role-balance">{tokenInfo[role].balance}</span>
          </div>
        </div>
      )) : grayscaleImages.map((image, index) => (
        <div key={index} className="role-info" style={{ position: 'relative' }}>
          <img 
            src={image}
            alt={`Role ${index + 1}`} 
            className="icon icon-shape rounded-4 bg-secondary bg-opacity-40" 
            style={{width: '100%', height: 'auto', filter: 'grayscale(100%)'}}
          />
        </div>
      ))}
    </div>
  </div>
);

  
  // return function 
  return (
      <div className="infoContainer">
          {renderTokenInfo}
      </div>
  );
  

};


export default DisplayPineBadges;