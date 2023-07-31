import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';


interface UserData {
  discord: string | null;
  twitter: string | null;
  wallet: string;
  createdat: string;
  pine_holder: boolean;
}

const SubmitContentForm: React.FC = () => {
  // state variables
  const { address, isConnected } = useAccount();
  const [contentURL, setContentURL] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [contentType, setContentType] = useState('');
  const [isCertified, setIsCertified] = useState<boolean>(false);
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { openConnectModal } = useConnectModal();

  // Check if users is Certified to submit content, udpating isCertified
  useEffect(() => {
    const checkCertification = async () => {
      try {
        if (isConnected && address) {
          const response = await fetch(`/api/getWalletData?wallet=${address}`);
          const data: UserData[] = await response.json();
          if (data.length > 0) {
            const user = data[0];
            setIsCertified(!!user.pine_holder);
          } else {
            setIsCertified(false);
          }
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    checkCertification();
  }, [isConnected, address]);


  // handles content submission
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!isCertified || contentURL.trim() === '' || imageURL.trim() === '' || contentType.trim() === '') {
      return;
    }

    const data = {
      contentURL,
      imageURL,
      contentType,
      wallet: address || '',
    };

    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Response was not ok');
      }

      setContentURL('');
      setImageURL('');
      setContentType('');
      setIsSubmitted(true); 
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  // Assigns variable values. 
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'contentURL':
        setContentURL(value);
        break;
      case 'imageURL':
        setImageURL(value);
        break;
      case 'contentType':
        setContentType(value);
        break;
      default:
        break;
    }
  };




  return (
    <div>
      <div className="text-end">
      {/* Submit Content Button*/}
      <a href="#" className="btn btn-sm btn-primary d-block d-md-inline-block ms-auto ms-md-0"
        onClick={() => {
          if (!isCertified && isConnected) {
            return; 
          }
          if (!isConnected) {
            openConnectModal?.();
          } else {
            setIsModalOpen(true);
          }
        }}
      >
        Submit Content
      </a>
      {isConnected && !isCertified && <p style={{fontSize: 'small', color: 'red'}}>*Need Pine NFT to submit.</p>}
    </div>
  
      {/* Modal setup for Submit Content*/}
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
          {/* Display on the Modal*/}
           <div className="row justify-content-center">
              <div className="col-lg-12 mx-auto ms-xl-0 d-flex flex-column align-items-center justify-content-center">
                <div className="mt-10 mt-lg-5 mb-6 d-lg-block">
                  <span className="d-inline-block d-lg-block h1 mb-4 mb-lg-6 me-3">🌲</span>
                  <h1 className="ls-tight font-bolder h2">Submit Content!</h1>
                </div>
                <form onSubmit={handleSubmit} className="w-100">
                  <div className="mb-5">
                    <div className="d-flex align-items-center justify-content-between">
                      <label className="form-label" htmlFor="contentURL">Content URL:</label>
                    </div>
                    <input type="text" name="contentURL" value={contentURL} onChange={handleInputChange} className="form-control form-control-lg col-12 col-md-8 col-lg-6" id="contentURL"/>
                  </div>
                  <div className="mb-5">
                    <div className="d-flex align-items-center justify-content-between">
                      <label className="form-label" htmlFor="imageURL">Image URL:</label>
                    </div>
                    <input type="text" name="imageURL" value={imageURL} onChange={handleInputChange} className="form-control form-control-lg col-12 col-md-8 col-lg-6" id="imageURL"/>
                  </div>
                  <div className="mb-5">
                    <div className="d-flex align-items-center justify-content-between">
                      <label className="form-label" htmlFor="contentType">Content Type:</label>
                    </div>
                    <input type="text" name="contentType" value={contentType} onChange={handleInputChange} className="form-control form-control-lg col-12 col-md-8 col-lg-6" id="contentType"/>
                  </div>
                  <div>
                    <input type="submit" value="Submit" className="btn btn-primary w-full" />
                  </div>
                  <div style={{
                    opacity: isSubmitted ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                    marginTop: '10px'
                  }}>
                    Form submitted successfully!
                  </div>
                </form>
              </div>
            </div>
            {/* Exit out of modal button*/}
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
    </div>
  );
  
};

export default SubmitContentForm;
