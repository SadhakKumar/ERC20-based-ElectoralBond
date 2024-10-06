import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ContractFactory from "../contracts/ContractFactory.json";
import ElectoralBond from "../contracts/ElectoralBond.json";
import { useAccount } from "wagmi";
import Navbar from "../Components/Navbar";

const Political = () => {
  const { isConnected, address } = useAccount();
  const [contractFactory, setContractFactory] = useState();
  const [tokenContract, setTokenContract] = useState();
  const [tokenDetails, setTokenDetails] = useState({
    name: "",
    symbol: "",
    totalSupply: "",
  });
  const [donations, setDonations] = useState({
    address: [],
    donation: [],
  });
  const [mintAmount, setMintAmount] = useState();
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
    const loadTokenContract = async () => {
      const contractAddress = await contractFactory.getContractAddress(address);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(
        contractAddress,
        ElectoralBond.abi,
        signer
      );
      setTokenContract(tokenContract);
    };

    if (contractFactory) {
      loadTokenContract();
    }
  }, [contractFactory]);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const name = await tokenContract.getName();
        const symbol = await tokenContract.getSymbol();
        const totalSupply = await tokenContract.balanceOf(address);
        totalSupply.toString();
        setTokenDetails({ name, symbol, totalSupply });
        const donations = await tokenContract.getAllDonations();
        setDonations({ address: donations[0], donation: donations[1] });
      } catch (error) {
        console.error("Error getting token details", error);
      }
    };

    if (tokenContract) {
      getDetails();
    }
  }, [tokenContract]);

  const mintToken = async (e) => {
    if (!mintAmount) {
      alert("Please enter mint amount");
      return;
    }

    e.preventDefault();
    const tx = await tokenContract.mint(mintAmount);
    await tx.wait();

    console.log("Token minted");
  };

  return (
    <>
      <Navbar />

      {tokenDetails.name && tokenDetails.symbol && tokenDetails.totalSupply ? (
        <div className="bg-base-200 stats stats-vertical lg:stats-horizontal shadow mt-20">
          <div className="stat">
            <div className="stat-title">Party Name</div>
            <div className="stat-value">{tokenDetails.name}</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>

          <div className="stat">
            <div className="stat-title">Token Symbol</div>
            <div className="stat-value">{tokenDetails.symbol}</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>

          <div className="stat">
            <div className="stat-title">Balance</div>
            <div className="stat-value">
              {tokenDetails.totalSupply.toString()}
            </div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
      ) : (
        <div>
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      <h1 className="mt-10">Holdings</h1>
      {donations.address.length > 0 ? (
        <div className="bg-base-200 overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Address</th>
                <th>Holdings</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {donations.address.map((address, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{address}</td>
                  <td>{donations.donation[index].toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      <div className="flex justify-center">
        <div className="flex justify-center hero-content mt-10">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Mint now!</h1>
            <p className="py-6">
              Mint your ERC20 Tokens now and get ready for the elections
            </p>
          </div>
          <div className="card bg-base-200 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Mint Amount</span>
                </label>
                <input
                  type="text"
                  placeholder="Amount"
                  className="input input-bordered"
                  required
                  onChange={(e) => setMintAmount(e.target.value)}
                />
              </div>
              <div className="form-control mt-6">
                <button
                  className="btn btn-primary"
                  onClick={(e) => mintToken(e)}
                >
                  Mint
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Political;
