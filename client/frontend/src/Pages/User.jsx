import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import ContractFactory from "../contracts/ContractFactory.json";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();
  const { isConnected, address } = useAccount();
  const [contractFactory, setContractFactory] = useState();
  const [tokenDetails, setTokenDetails] = useState([]);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contractFactory = new ethers.Contract(
      process.env.REACT_APP_CONTRACTFACTORY_CONTRACT_ADDRESS,
      ContractFactory.abi,
      signer
    );
    setContractFactory(contractFactory);
  }, []);

  useEffect(() => {
    const getAllTokens = async () => {
      const tokenDetails = await contractFactory.getAllContractsDetails();
      console.log("All tokens", tokenDetails);
      setTokenDetails(tokenDetails);
    };

    if (contractFactory) {
      getAllTokens();
    }
  }, [contractFactory]);

  const handleClick = (token) => {
    navigate(`/user/${token.tokenAddress}`, { state: { token } });
  };
  return (
    <>
      <Navbar />
      <h1>Token Listing</h1>
      {tokenDetails.length > 0 ? (
        <div className="flex flex-wrap justify-center items-center">
          {tokenDetails.map((token, index) => (
            <div key={index} className="m-10 bg-base-100 card w-96 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{token.symbol}</h2>
                <p>{token.name}</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleClick(token)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1>No tokens found</h1>
      )}
    </>
  );
};

export default User;
