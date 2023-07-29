import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAccount } from 'wagmi';

const CreateUserForm: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [discord, setDiscord] = useState('');
  const [twitter, setTwitter] = useState('');
  const [email, setEmail] = useState(''); // Add state for email

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Prevent submission if any field is empty
    if (discord.trim() === '' || twitter.trim() === '' || email.trim() === '') {
      return;
    }

    const data = { discord, twitter, email, wallet: address || ''}; // Include email in data

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
      setEmail(''); // Clear email field
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
      case 'email': // Handle email input change
        setEmail(value);
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
      <label>
        Email: {/* Add email input field */}
        <input type="email" name="email" value={email} onChange={handleInputChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default CreateUserForm;
