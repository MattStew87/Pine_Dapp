import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import SubmitContentForm from '../components/submitContent';

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

  // fetch users content from database
  useEffect(() => {
    const fetchContent = async () => {
      if (isConnected && address) {
        try {
          const response = await fetch(`/api/getContent?wallet=${address}`);
          if (!response.ok) {
            throw new Error('Response was not ok');
          }
          const data: ContentItem[] = await response.json();
          setContent(data.slice(0, 3)); // Only take the first 3 items
        } catch (error: any) {
          console.error('An error occurred:', error);
        }
      }
    };

    fetchContent();
  }, [isConnected, address]);

  // If there are less than 3 content items, fill the rest with default values
  while (content.length < 3) {
    content.push({
      wallet: '',
      contenturl: '#',
      imageurl: '',
      contenttype: '',
      createdat: '',
    });
  }

  // Display users content 
  return (
    <div className="row g-6 mb-8">
      {/* First card for SubmitContentForm */}
      <div className="col-xl-3 col-sm-6 col-12">
            <SubmitContentForm />
      </div>

      {/* Next three cards for content */}
      {content.map((item, index) => {
        const contentURL = item.contenturl;
        const imageURL = item.imageurl;
        const contentType = item.contenttype;

        return (
          <div className="col-xl-3 col-sm-6 col-12" key={index}>
            <div className={`card ${imageURL ? 'shadow-4-hover' : ''}`} style={{ 
              border: imageURL ? 'none' : '2px dashed gray',
              backgroundColor: imageURL ? '' : 'transparent' 
            }}>
              <div style={{ backgroundColor: imageURL ? '' : 'transparent' }}>
                <div className="card-body" style={{ backgroundColor: imageURL ? '' : 'transparent' }}>
                  <div style={{ position: 'relative' }}>
                    <a href={contentURL}>
                      <div style={{ 
                        width: '100%', 
                        height: '200px', 
                        overflow: 'hidden', 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        {imageURL && (
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
                        )}
                      </div>
                    </a>
                    <p className="badge rounded-pill text-white" style={{ 
                      position: 'absolute', 
                      top: '10px', 
                      right: '10px', 
                      padding: '5px', 
                      borderRadius: '5px',
                      backgroundColor: '#6ECC6E',
                      color: '#FFFFFF',
                      borderColor: '#6ECC6E' 
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
