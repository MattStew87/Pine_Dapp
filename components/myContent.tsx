import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

interface ContentItem {
  wallet: string;
  contenturl: string;
  imageurl: string;
  contenttype: string;
  createdat: string;
}

const MyContent: React.FC = () => {
  // state variables
  const [content, setContent] = useState<ContentItem[]>([]);
  const { address, isConnected } = useAccount();

  // fetch Content page 
  useEffect(() => {
    const fetchContent = async () => {
      if (isConnected && address) {
        try {
          const response = await fetch(`/api/getContent?wallet=${address}`);
          if (!response.ok) {
            throw new Error('Response was not ok');
          }
          const data: ContentItem[] = await response.json();
          setContent(data.slice(0, 4)); // Only take the first 4 items
        } catch (error: any) {
          console.error('An error occurred:', error);
        }
      }
    };

    fetchContent();
  }, [isConnected, address]);

  // If there are less than 4 content items, fill the rest with default values
  while (content.length < 4) {
    content.push({
      wallet: '',
      contenturl: '#',
      imageurl: 'https://www.christies.com/media-library/images/features/articles/2021/04/10-thing-to-know-about-cryptopunks/larva-labs-2005-cryptopunks-2017-non-fungible-token-21st-century-evening-sales-christies-hero-opt-new.jpg',
      contenttype: 'Blank',
      createdat: '',
    });
  }

  return (
    <div className="row g-6 mb-8">
      {content.map((item, index) => {
        const contentURL = item.contenturl;
        const imageURL = item.imageurl;
        const contentType = item.contenttype;
  
        return (
          <div className="col-xl-3 col-sm-6 col-12" key={index}>
            <div className="card">
              <div className="card shadow-4-hover">
                <div className="card-body">
                  <div style={{ position: 'relative' }}>
                    <a href={contentURL}>
                      <div style={{ 
                        width: '100%', // Set the width of the container
                        height: '200px', // Set the height of the container
                        overflow: 'hidden', // Hide the parts of the image that don't fit in the container
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        <img 
                          src={imageURL} 
                          alt="content" 
                          style={{ 
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'cover', 
                            transition: 'transform 0.3s ease-in-out'
                          }} 
                          className="img-hover"
                          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                          onMouseOut={e => e.currentTarget.style.transform = ''}
                        />
                      </div>
                    </a>
                    <p className="badge rounded-pill bg-primary text-white" style={{ 
                      position: 'absolute', 
                      top: '10px', 
                      right: '10px', 
                      padding: '5px', 
                      borderRadius: '5px' 
                    }}>
                      {contentType}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
  
};

export default MyContent;
