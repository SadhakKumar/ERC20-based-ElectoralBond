import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import ContractFactory from "../contracts/ContractFactory.json";
import Enrollment from "../contracts/Enrollment.json";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

const PoliticalEnrolment = () => {
  const navigate = useNavigate();
  const [contractFactory, setContractFactory] = useState();
  const [enrollmentContract, setEnrollmentContract] = useState();
  const [name, setName] = useState("");
  const [sybmol, setSymbol] = useState("");

  useEffect(() => {
    const loadBlockchainData = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contractFactory = new ethers.Contract(
        process.env.REACT_APP_CONTRACTFACTORY_CONTRACT_ADDRESS,
        ContractFactory.abi,
        signer
      );

      const enrollmentContract = new ethers.Contract(
        process.env.REACT_APP_ENROLLMENT_CONTRACT_ADDRESS,
        Enrollment.abi,
        signer
      );

      console.log("Contract Factory", contractFactory);
      console.log("Enrollment Contract", enrollmentContract);

      setContractFactory(contractFactory);
      setEnrollmentContract(enrollmentContract);
    };

    loadBlockchainData();
  }, []);

  const enrollParty = async () => {
    if (name === "" || sybmol === "") {
      alert("Please fill all the fields");
      return;
    }
    try {
      const tx = await contractFactory.createNewERC(name, sybmol);
      await tx.wait();
      console.log("ERC20 Token created", tx);

      const tx2 = await enrollmentContract.EnrollAspoliticalParty();
      await tx2.wait();
      console.log("Enrolled as political party", tx2);
    } catch (error) {
      console.error("Error enrolling as political party", error);
    }
    navigate("/political");
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen justify-center items-center">
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://m.economictimes.com/thumb/msid-86026540,width-1200,height-900,resizemode-4,imgsize-19528/politics-neta-india-gett.jpg"
              alt="Album"
              className="w-72 h-72"
            />
          </figure>
          <div className="card-body">
            <h1>Enter ERC20 Tokens details</h1>
            <label className="input input-bordered flex items-center gap-2">
              Name
              <input
                value={name}
                type="text"
                className="grow"
                placeholder=""
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Sybmol
              <input
                type="text"
                value={sybmol}
                className="grow"
                placeholder=""
                onChange={(e) => setSymbol(e.target.value)}
              />
            </label>
            <button className="btn btn-outline btn-info" onClick={enrollParty}>
              Enroll
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PoliticalEnrolment;
