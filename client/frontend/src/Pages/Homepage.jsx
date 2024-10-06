import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import Enrollment from "../contracts/Enrollment.json";
import { useNavigate } from "react-router-dom";
import Enrollmentcomp from "../Components/Enrollmentcomp";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Homepage = () => {
  const [contract, setContract] = useState();
  const { isConnected, address } = useAccount();
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      // process.env.REACT_APP_ENROLLMENT_CONTRACT_ADDRESS,
      process.env.REACT_APP_ENROLLMENT_CONTRACT_ADDRESS,
      Enrollment.abi,
      signer
    );
    setContract(contract);
  }, []);

  useEffect(() => {
    const getRole = async () => {
      const role = await contract.IsPoliticalParty();
      if (role) {
        setRole("political");
        console.log("User is a political party");
      }
      const userrole = await contract.IsUser();
      if (userrole) {
        setRole("user");
        console.log("User is a user");
      }
    };

    if (isConnected) {
      getRole();
    }
  }, [contract, isConnected]);

  useEffect(() => {
    console.log("isConnected: ", isConnected);
    if (isConnected) {
      console.log("Connected with address: ", address);
    }
  }, [isConnected, address]);
  return (
    <>
      <Navbar />

      {isConnected ? (
        role === "political" ? (
          navigate("/political")
        ) : role === "user" ? (
          navigate("/user")
        ) : (
          <Enrollmentcomp contract={contract} />
        )
      ) : (
        <div className="flex h-screen justify-center items-center">
          <div className="flex card lg:card-side bg-base-100 shadow-xl w-1/2">
            <figure>
              <img
                src="https://d18x2uyjeekruj.cloudfront.net/wp-content/uploads/2022/04/ebs.jpg"
                alt="Album"
                className="h-72 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Connect your wallet!</h2>
              <p>Click the button to Connect wallet.</p>
              <div className="card-actions justify-end">
                <ConnectButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Homepage;
