import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import "@rainbow-me/rainbowkit/styles.css";

import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Homepage from "./Pages/Homepage";
import Political from "./Pages/Political";
import User from "./Pages/User";
import PoliticalEnrolment from "./Pages/PoliticalEnrolment";
import UserPartyPage from "./Pages/UserPartyPage";

const queryClient = new QueryClient();

const ganache = {
  id: 1337,
  name: "Ganache",
  iconUrl:
    "https://seeklogo.com/images/G/ganache-logo-1EB72084A8-seeklogo.com.png",
  iconBackground: "#fff",
  nativeCurrency: { name: "Ganache", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["HTTP://127.0.0.1:7545"] },
  },
};

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, polygon, optimism, arbitrum, base, ganache],
  ssr: false, // If your dApp uses server side rendering (SSR)
});

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          <div className="App">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/political" element={<Political />} />
              <Route path="/user" element={<User />} />
              <Route path="/user/:id" element={<UserPartyPage />} />
              <Route
                path="/politicalenrollment"
                element={<PoliticalEnrolment />}
              />
            </Routes>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
