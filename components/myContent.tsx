import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

interface ContentItem {
  wallet: string;
  contentURL: string;
  imageURL: string;
  contentType: string;
  createdAt: string;
}

const MyContent: React.FC = () => {
  // state variables
  const [content, setContent] = useState<ContentItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { address, isConnected } = useAccount();

  // fetch Content page 
  useEffect(() => {
    const fetchContent = async () => {
      if (isConnected && address) {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/getContent?wallet=${address}`);
          if (!response.ok) {
            throw new Error('Response was not ok');
          }
          const data: ContentItem[] = await response.json();
          setContent(data);
          setIsLoading(false);
        } catch (error: any) {
          console.error('An error occurred:', error);
          setIsLoading(false);
        }
      }
    };

    fetchContent();
  }, [isConnected, address]);

  // ...

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Prepare content array with items from the database and default items
  const preparedContent = [...(content || []), ...Array(4)].slice(0, 4);

  return (
    <div className="row g-6 mb-8">
      {preparedContent.map((item, index) => {
        const imageURL = item?.imageURL || "/jackthepine_green_pine_sapling_in_a_lush_forest_digital_art_bru_fa6c8d1e-08fb-4012-8ffb-f3d21e1772b4.png";
        const contentURL = item?.contentURL || "#";
        const contentType = item?.contentType || "blank";

        return (
          <div className="col-xl-3 col-sm-6 col-12" key={index}>
            <div className="card">
              <div className="card shadow-4-hover">
                <div className="card-body">
                  <a href={contentURL} target="_blank" rel="noopener noreferrer">
                    <img 
                      src={imageURL} 
                      onError={(e) => {
                        e.currentTarget.src = "/jackthepine_green_pine_sapling_in_a_lush_forest_digital_art_bru_fa6c8d1e-08fb-4012-8ffb-f3d21e1772b4.png";
                      }}
                      alt={`Content ${index}`} 
                      style={{ position: 'relative', width: '20%', height: '20%' }} 
                      className="rounded-circle"
                    />
                    <span style={{ position: 'absolute', top: '10px', right: '10px' }}>{contentType}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MyContent;

