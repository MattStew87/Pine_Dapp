import { useAccount } from 'wagmi'
import {useState, useEffect, useMemo} from 'react';
import { readContract } from '@wagmi/core'

// Pine Badges ABI File
import Badges_ABI from  '../pages/ABI_Folder/Badges.json'


// Contract addresses
const Badges_Address = '0xFaA85a0903985bAAF3Ba9EdE37db6b9e325630b7';
const Pine_NFT_Address = '0x6A711028d8E01519Bc6524BEbC885f3DE36ccbB6';


const DisplayPine = () => {
  // Hooks
  const { address, isConnected } = useAccount()
  const [tokenInfo, setTokenInfo] = useState<{ [key: string]: { balance: string, imageUrl: string } }>({});
  const [pineNFTs, setPineNFTs] = useState<{ imageUrl: string; tokenId: number }[]>([]);



  // Roles are static, so we use useMemo for performance optimization
  const roles = useMemo<string[]>(() => ['Pine Challenger', 'Pine Citizen', 'Pine Trailblazer', 'Pine Orator', 'Pine Journalist', 'Pine Pundit'], []);


  // grabs Pine NFT informatin
  async function fetchTokenData(tokenIndex: number): Promise<{ imageUrl: string; tokenId: number } | null> {
    const balance = await readContract({
      address: Pine_NFT_Address,
      abi: Badges_ABI,
      functionName: 'balanceOf',
      args: [address, tokenIndex]
    }) as number;
  
    if (balance > 0) {
      // User is a Pine Holder, update the database
      try {
        const response = await fetch('/api/pineHolder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({wallet: address}),
        });
  
        if (!response.ok) {
          throw new Error('Response was not ok');
        }
        
        const responseData = await response.json();
        
        //console.log(responseData);
      } catch (error) {
        console.error('An error occurred:', error);
      }
  
      const ipfsHash = await readContract({
        address: Pine_NFT_Address,
        abi: Badges_ABI,
        functionName: 'uri',
        args: [tokenIndex]
      }) as string;
  
      const ipfsUrl = `https://ipfs.io/ipfs/${ipfsHash}`;
      const response = await fetch(ipfsUrl);
      const metadata = await response.json();
      const imageUrl = metadata.image;
  
      return { imageUrl, tokenId: tokenIndex };
    }
  
    return null;
  }
  

  // Fetch Pine NFTs when isConnected or address changes 
  useEffect(() => {
      async function fetchData() {
        if (!isConnected) return;

        let PineNFTArray = [];
        let tokenIndex = 0;
        let maxTokens = 150; 

        while (tokenIndex < maxTokens) {
            let fetchPromises = [];

            for (let i = 0; i < 10 && tokenIndex < maxTokens; i++) {
              fetchPromises.push(fetchTokenData(tokenIndex));
              tokenIndex++;   
            }

            try {
              let results = await Promise.all(fetchPromises);
              for (let tokenData of results) {
                  if (tokenData) PineNFTArray.push(tokenData);
              }
              
            }
             catch (error) {
                console.error('Failed to fetch Pine NFTs:', error);
                break;
              } 
        }

        setPineNFTs(PineNFTArray);
      }

    fetchData();

  }, [isConnected, address]);


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


  // Pine NFT Information Display
  const renderPineNFTs = (
    <div>
        <h2>Pine NFT:</h2>
        {pineNFTs.length > 0 
            ? pineNFTs.map((token, i) => (
                <div key={i} className="role-info">
                    <img src={token.imageUrl} alt={`Pine NFT ${i+1}`} className="icon icon-shape rounded-4 bg-secondary bg-opacity-40" />
                    <div className="role-text">
                        <strong>Pine NFT {i+1}:</strong>
                        <span className="role-has">✔️</span>
                    </div>
                </div>
            ))
            : <div className="role-info">
                <strong>Pine NFT:</strong>
                <span className="role-no">❌</span>
              </div>
        }
    </div>
  );


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


export default DisplayPine;