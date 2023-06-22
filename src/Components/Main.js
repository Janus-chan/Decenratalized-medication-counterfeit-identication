import React, { useState } from "react";
import PopupDialog from "./Popup";
import { ethers } from "ethers";
import PublicABI from "../Json/Public.json";

const Main = () => {
  let old_obj;
  let currentCID;
  const [showPopup, setShowPopup] = useState(false);
  const [pubS, setpubS] = useState("");
  const [mains, setMains] = useState(null);

  const togglePopup = async () => {
    let provider;
    let usdc;
    let usdcContract;

    const MainABI = PublicABI.abi;
    provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    usdc = {
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abi: MainABI,
    };

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    usdcContract = new ethers.Contract(usdc.address, MainABI, signer);

    if (pubS === "") {
      alert("Please Fill the Serial Number field");
      return;
    }

    currentCID = await usdcContract.IpfsRevision(pubS);

    await fetch(`https://ipfs.io/ipfs/${currentCID}/hello.json`)
      .then((response) => {
        return response.text();
      })
      .then(async (data) => {
        old_obj = JSON.parse(data);

        setMains(old_obj);
      });

    setShowPopup(!showPopup);
  };

  async function finalSerial(e) {
    setpubS(e.target.value);
  }

  return (
    <div>
      <h1>PUBLIC</h1>
      <input
        type="Number"
        className="form-control  "
        onChange={finalSerial}
        style={{ width: "40%", marginLeft: "30%" }}
      />
      <button onClick={togglePopup} className="btn btn-primary mt-4">
        Verify
      </button>

      {showPopup && <PopupDialog onClose={togglePopup} myData={mains} />}
    </div>
  );
};

export default Main;
