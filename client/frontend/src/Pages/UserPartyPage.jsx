import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ElectoralBond from "../contracts/ElectoralBond.json";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

const UserPartyPage = () => {
  const location = useLocation();
  const { token } = location.state;
  const { address } = useAccount();

  const [tokenContract, setTokenContract] = useState();
  const [balance, setBalance] = useState();
  const [numberOfTokens, setNumberOfTokens] = useState();

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const tokenContract = new ethers.Contract(
      token.tokenAddress,
      ElectoralBond.abi,
      signer
    );

    setTokenContract(tokenContract);
  }, []);

  useEffect(() => {
    const getDetails = async () => {
      const balance = await tokenContract.balanceOf(address);
      setBalance(balance.toString());
    };
    if (tokenContract) {
      getDetails();
    }
  }, [tokenContract]);

  const buyTokens = async () => {
    try {
      const options = { value: ethers.utils.parseEther("1.0") };
      if (!numberOfTokens) {
        alert("Please enter the number of tokens to buy");
        return;
      }
      const cost = numberOfTokens * 0.5;
      const tx = await tokenContract.buyToken(numberOfTokens, {
        value: ethers.utils.parseEther(cost.toString()),
      });
      await tx.wait();
      console.log("Tokens bought", tx);
    } catch (error) {
      console.error("Error buying tokens", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="hero bg-base-300 min-h-screen">
        <div className="bg-base-200 hero-content text-center rounded-lg">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">{token.symbol}</h1>
            <p className="py-6">
              {token.name} is a political party token. You can use this token to
              donate to the party.
            </p>

            <div className="flex stats shadow">
              <div className="stat">
                <div className="stat-title">Your current token holdings</div>
                <div className="stat-value">{balance}</div>
                <div className="stat-desc">Token</div>
              </div>
            </div>

            <div className="h-32 p-5 flex items-center">
              <input
                type="text"
                value={numberOfTokens}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs m-2"
                onChange={(e) => setNumberOfTokens(e.target.value)}
              />

              <button className="m-2 btn btn-primary" onClick={buyTokens}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPartyPage;
