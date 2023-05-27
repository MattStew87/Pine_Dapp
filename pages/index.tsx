import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';

const Home: NextPage = () => {
  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();
  const router = useRouter();

  const handleFormButtonClick = () => {
    if (!isConnected) {
      openConnectModal?.();
    } else {
      router.push('/form');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      <ConnectButton />
      <button onClick={handleFormButtonClick}>Go to form</button>
    </div>
  );
};

export default Home;
