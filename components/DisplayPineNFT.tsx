import { useAccount } from 'wagmi'
import {useState, useEffect, useMemo} from 'react';
import { readContract } from '@wagmi/core'
import Badges_ABI from  '../pages/ABI_Folder/Badges.json'

// Contract addresses
const Pine_NFT_Address = '0x6A711028d8E01519Bc6524BEbC885f3DE36ccbB6';


const DisplayPineNFT = () => {
  // Define state variables
  const { address, isConnected } = useAccount()
  const [pineNFTs, setPineNFTs] = useState<{ imageUrl: string; tokenId: number }[]>([]);


  // Function to fetch token data
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




  // Function to render Pine NFTs
  const renderPineNFTs = (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // Adjust this to change the number of images per row
        gridGap: '10px'
      }}>
        {Array.from({ length: 6 }).map((_, i) => {
          const token = pineNFTs[i];
          return (
            <div key={i} className="role-info" style={{ position: 'relative' }}>
              <img 
                src={token ? token.imageUrl : "/logo_v2_8.png"} 
                alt={`Pine NFT ${i+1}`} 
                className="icon icon-shape rounded-4 bg-secondary bg-opacity-40" 
                style={{width: '100%', height: 'auto', filter: token ? 'none' : 'grayscale(100%)'}}
              />
            </div>
          );
        })}
      </div>
    </div>
  );


  return (
      <div className="infoContainer" style={{ maxHeight: '340px'}}>
          {renderPineNFTs}
      </div>
  );
  

};

export default DisplayPineNFT;