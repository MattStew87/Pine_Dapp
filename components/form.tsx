// pages/form.tsx

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAccount } from 'wagmi';

const CreateUserForm: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [discord, setDiscord] = useState('');
  const [twitter, setTwitter] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Prevent submission if either field is empty
    if (discord.trim() === '' || twitter.trim() === '') {
      return;
    }

    const data = { discord, twitter, wallet: address || ''};

    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Response was not ok');
      }

      const responseData = await response.json();

      console.log(responseData);

      // Clear the form
      setDiscord('');
      setTwitter('');
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'discord':
        setDiscord(value); 
        break;
      case 'twitter':
        setTwitter(value);
        break;
      default:
        break;
    }
  };

  if (!isConnected) {
    return <div>Please connect your wallet to submit the form.</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Discord:
        <input type="text" name="discord" value={discord} onChange={handleInputChange} />
      </label>
      <label>
        Twitter:
        <input type="text" name="twitter" value={twitter} onChange={handleInputChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default CreateUserForm;
