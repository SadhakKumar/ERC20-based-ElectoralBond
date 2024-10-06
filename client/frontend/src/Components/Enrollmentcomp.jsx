import React, { useEffect } from "react";
import Enrollment from "../contracts/Enrollment.json";
import ContractFactory from "../contracts/ContractFactory.json";
import User from "../Pages/User";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

const Enrollmentcomp = ({ contract }) => {
  const navigate = useNavigate();
  const Enrolluser = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      // process.env.REACT_APP_ENROLLMENT_CONTRACT_ADDRESS,
      process.env.REACT_APP_ENROLLMENT_CONTRACT_ADDRESS,
      Enrollment.abi,
      signer
    );

    const tx = await contract.EnrollAsUser();
    await tx.wait();
    console.log("User Enrolled");
    navigate("/user");
  };
  const EnrollAsPoliticalParty = async () => {
    navigate("/politicalenrollment");
  };
  return (
    <>
      <div className="flex justify-center align-center m-10">
        <div className="card bg-base-100 image-full w-96 shadow-xl m-10">
          <figure>
            <img
              src="https://bpac.in/wp-content/uploads/2020/07/BPAC_Main.png"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Enroll As political party!</h2>
            <p>Get you own political parties ERC20 Tokens</p>
            <div className="card-actions justify-end">
              <button
                onClick={EnrollAsPoliticalParty}
                className="btn btn-primary"
              >
                Enroll
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 image-full w-96 shadow-xl m-10">
          <figure>
            <img
              src="https://blog.ipleaders.in/wp-content/uploads/2018/05/hands-1063442_960_720.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">User!</h2>
            <p>Buy Electoral Bonds by becoming a user</p>
            <div className="card-actions justify-end">
              <button onClick={Enrolluser} className="btn btn-primary">
                Enroll
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Enrollmentcomp;
