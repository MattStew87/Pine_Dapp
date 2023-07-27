import { useAccount } from 'wagmi'
import {useState, useEffect} from 'react';
import { readContract } from '@wagmi/core'

// Pine Badges ABI File
import Badges_ABI from  '../pages/ABI_Folder/Badges.json'

// Contract addresses
const Pine_NFT_Address = '0x6A711028d8E01519Bc6524BEbC885f3DE36ccbB6';

const Profile = () => {
  // Hooks
  const { address, isConnected } = useAccount()
  const [pineNFT, setPineNFT] = useState<{ imageUrl: string; tokenId: number } | null>(null);

  // grabs Pine NFT informatin
  async function fetchTokenData(tokenIndex: number): Promise<{ imageUrl: string; tokenId: number } | null> {
    const balance = await readContract({
      address: Pine_NFT_Address,
      abi: Badges_ABI,
      functionName: 'balanceOf', 
      args: [address, tokenIndex]
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
  
    return null;
  }
  

  // Fetch Pine NFTs when isConnected or address changes 
  useEffect(() => {
    async function fetchData() {
      if (!isConnected) return;

      let tokenIndex = 0;
      let maxTokens = 150; 

      while (tokenIndex < maxTokens) {
        const tokenData = await fetchTokenData(tokenIndex);
        if (tokenData) {
          setPineNFT(tokenData);
          break;
        }
        tokenIndex++;
      }
    }

    fetchData();
  }, [isConnected, address]);

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

export default Profile;

