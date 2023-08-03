import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAccount } from 'wagmi';

const CreateUserForm: React.FC = () => {
  const { address } = useAccount();
  const [discord, setDiscord] = useState('');
  const [twitter, setTwitter] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Logs Data to the Databasee upon Submission and updates variable states
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (discord.trim() === '' || twitter.trim() === '' || email.trim() === '') {
      return;
    }

    const data = { discord, twitter, email, wallet: address || ''};

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

      setDiscord('');
      setTwitter('');
      setEmail('');
      setIsSubmitted(true);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  // Sets Values upon input change
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'discord':
        setDiscord(value);
        break;
      case 'twitter':
        setTwitter(value);
        break;
      case 'email':
        setEmail(value);
        break;
      default:
        break;
    }
  };

  // Creates the Edit Profile Form Display. 
  return (
    <div className="row justify-content-center">
      <div className="col-lg-12 mx-auto ms-xl-0 d-flex flex-column align-items-center justify-content-center">
        <div className="mt-10 mt-lg-5 mb-6 d-lg-block">
          <span className="d-inline-block d-lg-block h1 mb-4 mb-lg-6 me-3">🌲</span>
          <h1 className="ls-tight font-bolder h2">Edit Profile!</h1>
        </div>
        <form onSubmit={handleSubmit} className="w-100">
          <div className="mb-5">
            <div className="d-flex align-items-center justify-content-between">
              <label className="form-label" htmlFor="twitter">Twitter:</label> 
          </div>
            <input type="text" name="twitter" value={twitter} onChange={handleInputChange} className="form-control form-control-lg col-12 col-md-8 col-lg-6" id="twitter"/>
          </div>
          <div className="mb-5">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <label className="form-label" htmlFor="discord">Discord:</label>
              </div>
            </div>
            <input type="text" name="discord" value={discord} onChange={handleInputChange} className="form-control form-control-lg col-12 col-md-8 col-lg-6" id="discord" autoComplete="o"/>
          </div>
          <div className="mb-5">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <label className="form-label" htmlFor="email">Email:</label>
              </div>
            </div>
            <input type="email" name="email" value={email} onChange={handleInputChange} className="form-control form-control-lg col-12 col-md-8 col-lg-6" id="email" autoComplete="off"/>
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
  );
};

export default CreateUserForm;
