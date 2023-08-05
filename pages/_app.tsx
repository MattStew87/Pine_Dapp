import '../styles/global.css'; 
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react'; // Add this import at the top of your file

// Boostrap css Files 
import '../styles/clever-dashboard-v1.0-2/clever-dashboard-v1.0/dist/css/_custom.css';
import '../styles/clever-dashboard-v1.0-2/clever-dashboard-v1.0/dist/css/main.css';
import '../styles/clever-dashboard-v1.0-2/clever-dashboard-v1.0/dist/css/utilities.css'; 



import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

import {
  RainbowKitProvider,
  getDefaultWallets, 
  connectorsForWallets,
  lightTheme 
} from '@rainbow-me/rainbowkit'; 
import { 
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';



require('dotenv').config();

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    polygon
  ],
  [publicProvider()]
);


const projectId = "4570d27347298164d7673f8b2b1fa7a0"
 
const { wallets } = getDefaultWallets({
  appName: 'RainbowKit demo',
  projectId: projectId,
  chains,
});

const demoAppInfo = {
  appName: 'Rainbowkit Demo',
};

const connectors = connectorsForWallets([
  ...wallets,
  { 
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),  
      trustWallet({ projectId, chains }), 
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export default function MyApp({ 
  Component, 
  pageProps, 
}: AppProps<{
  session: Session;
}>)  { 

  // Boostrap JS file
  useEffect(() => {
    require("../styles/clever-dashboard-v1.0-2/clever-dashboard-v1.0/dist/js/main.js");
    
  }, []);

  return (
    <WagmiConfig config={wagmiConfig}>
      <SessionProvider refetchInterval={0} session={pageProps.session}>
        <RainbowKitSiweNextAuthProvider>
          <RainbowKitProvider appInfo={demoAppInfo} chains={chains}  
            theme={lightTheme({
            accentColor: '#6ECC6E',
            accentColorForeground: 'white',
            borderRadius: 'large',
            fontStack: 'system',
          })} >
            <Component {...pageProps} />
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}

//export default MyApp; 
