import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useAccount } from 'wagmi';

interface UserData {
  discord: string | null;
  twitter: string | null;
  wallet: string;
  createdat: string;
  pine_holder: boolean;
}

const SubmitContentForm: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [contentURL, setContentURL] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [contentType, setContentType] = useState('');
  const [isCertified, setIsCertified] = useState<boolean>(false);

  useEffect(() => {
    const checkCertification = async () => {
      try {
        if (isConnected && address) {
          const response = await fetch(`/api/getWalletData?wallet=${address}`);
          const data: UserData[] = await response.json();
          if (data.length > 0) {
            const user = data[0];
            setIsCertified(!!(user.pine_holder && user.twitter && user.discord));
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
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

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

  if (!isCertified) {
    return <div>You must be a certified user to submit the form.</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Content URL:
        <input type="text" name="contentURL" value={contentURL} onChange={handleInputChange} />
      </label>
      <label>
        Image URL:
        <input type="text" name="imageURL" value={imageURL} onChange={handleInputChange} />
      </label>
      <label>
        Content Type:
        <input type="text" name="contentType" value={contentType} onChange={handleInputChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default SubmitContentForm;
