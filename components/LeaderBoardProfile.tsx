// Profile.tsx
import React, { useState, useEffect } from 'react';
import { readContract } from '@wagmi/core'

// Pine Badges ABI File
import Badges_ABI from  '../pages/ABI_Folder/Badges.json'

// Contract addresses
const Pine_NFT_Address = '0x6A711028d8E01519Bc6524BEbC885f3DE36ccbB6';

interface ProfileProps {
  holderAddress: string; 
  delay: number; // Add a delay prop
}

const LeaderBoardProfile: React.FC<ProfileProps> = ({ holderAddress, delay }) => {
  // Default image data
  const defaultImage = {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png",
    tokenId: 0
  };

  // State to hold the Pine NFT data
  const [pineNFT, setPineNFT] = useState<{ imageUrl: string; tokenId: number } | null>(defaultImage);

  // Function to fetch Pine NFT information
  async function fetchTokenData(tokenIndex: number): Promise<{ imageUrl: string; tokenId: number } | null> {
    try {
      const balance = await readContract({
        address: Pine_NFT_Address,
        abi: Badges_ABI,
        functionName: 'balanceOf',
        args: [holderAddress, tokenIndex]
      }) as number;
   
      if (balance > 0) {
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
    } catch (error) {
      console.error(`Failed to fetch token data for token index ${tokenIndex}: ${error}`);
    }
 
    // Return null if no NFT found
    return null;
  }

  // Fetch Pine NFTs when holderAddress changes
  useEffect(() => {
    const fetchData = async () => {
      let tokenIndex = 0;
      let maxTokens = 100;

      while (tokenIndex < maxTokens) {
        const tokenData = await fetchTokenData(tokenIndex);
        if (tokenData) {
          setPineNFT(tokenData);
          break;
        }
        tokenIndex++;
      }

      // If no NFT found after checking all tokens, set to default Pine sapling
      if (tokenIndex === maxTokens) {
        setPineNFT({
          imageUrl: "/jackthepine_green_pine_sapling_in_a_lush_forest_digital_art_bru_fa6c8d1e-08fb-4012-8ffb-f3d21e1772b4.png",
          tokenId: 0
        });
      }
    }

    // Use setTimeout to delay the fetch
    const timeoutId = setTimeout(fetchData, delay);
    return () => clearTimeout(timeoutId); // Clean up the timeout if the component unmounts
  }, [holderAddress, delay]);

  // Pine NFT Information Display
  const renderPineNFT = (
    <div>
        {pineNFT
            ? <img alt="Pine NFT" src={pineNFT.imageUrl} className="avatar avatar- rounded-circle" />
            : <img alt="Default Pine Sapling" src="/jackthepine_green_pine_sapling_in_a_lush_forest_digital_art_bru_fa6c8d1e-08fb-4012-8ffb-f3d21e1772b4.png" className="avatar avatar- rounded-circle" />
        }
    </div>
  );

  // return function
  return (
      <div className="infoContainer">
          {renderPineNFT}
      </div>
  );
};

export default LeaderBoardProfile;
