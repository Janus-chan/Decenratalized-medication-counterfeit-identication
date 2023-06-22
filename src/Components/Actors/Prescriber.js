import Navbar from "../Navbar";
import { React, useState } from "react";
import { Web3Storage, Blob, File } from "web3.storage";
import { ethers } from "ethers";
import SuppABI from "../../Json/Public.json";

function Prescriber(e) {
  const [serials, setserials] = useState("");

  async function presConnect(e) {
    e.preventDefault();
    let provider;
    let usdc;
    let usdcContract1;
    let cid1;

    const token = "YOUR_WEB3STORAGE_TOKEN"
      const client = new Web3Storage({ token });

    const MainABI = SuppABI.abi;
    provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    usdc = {
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abi: SuppABI,
    };

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    usdcContract1 = new ethers.Contract(usdc.address, MainABI, signer);
    if (serials === "") {
      alert("Please Fill the Serial Number ");
      return;
    }

    const currentCID = await usdcContract1.IpfsRevision(serials);

    try {
      await fetch(`https://ipfs.io/ipfs/${currentCID}/hello.json`)
        .then((response) => {
          return response.text();
        })
        .then(async (data) => {
          let old_obj = JSON.parse(data);

          const today = new Date();
          const yyyy = today.getFullYear();
          let mm = today.getMonth() + 1; // Months start at 0!
          let dd = today.getDate();

          if (dd < 10) dd = "0" + dd;
          if (mm < 10) mm = "0" + mm;

          const formattedToday = dd + "-" + mm + "-" + yyyy;
          let new_obj = {
            Prescriber_verified_Date: formattedToday,
            ...old_obj,
          };

          const blob = new Blob([JSON.stringify(new_obj)], {
            type: "application/json",
          });

          const files = [
            new File(["contents-of-file-1"], "plain-utf8.txt"),
            new File([blob], "hello.json"),
          ];
          cid1 = await client.put(files);

          const giveMeds2 = await usdcContract1.IpfsRevision(serials);
          const verify = await usdcContract1.Pverify(serials, cid1);
          const transactionReceipt = await verify.wait(1);
          alert("Medicine is verified successfully");
        });
    } catch (err) {
      await fetch(`https://ipfs.io/ipfs/${cid1}/hello.json`)
        .then((response) => {
          return response.text();
        })
        .then(async (data) => {
          let old_obj_reject = JSON.parse(data);
          delete old_obj_reject.Dispatched_Date;
        });
      alert("The product is counterfeit");
    }
  }

  function serialHandler(e) {
    setserials(e.target.value);
  }

  return (
    <div>
      <Navbar />

      <form onSubmit={presConnect}>
        <fieldset className="Manufacturer-main">
          <div className="form-group ">
            <fieldset>
              <label className="form-label mt-4">Serial Number</label>
              <input
                type="text"
                className="form-control"
                id="inputDefault"
                onChange={serialHandler}
              />
            </fieldset>
          </div>

          <button type="submit" className="btn btn-primary ">
            VERIFY
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Prescriber;
