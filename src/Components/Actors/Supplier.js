import Navbar from "../Navbar";
import { React, useState } from "react";
import { Web3Storage, Blob, File } from "web3.storage";
import { ethers } from "ethers";
import SuppABI from "../../Json/Public.json";
function Supplier() {
  const [serials, setserials] = useState("");
  const [_cid2, _setcid2] = useState("");

  const token = "YOUR_WEB3STORAGE_TOKEN";
    const client = new Web3Storage({ token });

  async function SuppConnect(e) {
    e.preventDefault();
    let provider;
    let usdc;
    let usdcContract1;
    let cid1;

    const MainABI = SuppABI.abi;
    provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    usdc = {
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abi: SuppABI,
    };

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();

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
            Supplier_verified_Date: formattedToday,
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

    
          _setcid2(_cid2);
          const verify = await usdcContract1.verify(serials, cid1);
          const transactionReceipt = await verify.wait(1);
          alert("The Product  is verified successfully");
        });
    } catch (err) {
      await fetch(`https://ipfs.io/ipfs/${cid1}/hello.json`)
        .then((response) => {
          return response.text();
        })
        .then(async (data) => {
          let old_obj_reject = JSON.parse(data);
          delete old_obj_reject.Supplier_verified_Date;
        });
      alert("The product is counterfeit");
    }
  }

  function serialHandler(e) {
    setserials(e.target.value);
  }

  async function dispatch(e) {
    let cid2;
    e.preventDefault();
    const MainABI = SuppABI.abi;
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    let usdc = {
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abi: SuppABI,
    };

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    let usdcContract2 = new ethers.Contract(usdc.address, MainABI, signer);

    if (serials === "") {
      alert("Please Fill the Serial Number");
      return;
    }

    const currentCID1 = await usdcContract2.IpfsRevision(serials);

    try {
      await fetch(`https://ipfs.io/ipfs/${currentCID1}/hello.json`)
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
            Supplier_Dispatched_Date: formattedToday,
            ...old_obj,
          };

          const blob = new Blob([JSON.stringify(new_obj)], {
            type: "application/json",
          });

          const files = [
            new File(["contents-of-file-1"], "plain-utf8.txt"),
            new File([blob], "hello.json"),
          ];
          cid2 = await client.put(files);
          const Supdispatch = await usdcContract2.Supdispatch(serials, cid2);
          const transactionReceiptDispatch = await Supdispatch.wait(1);
          alert("Item is Dispatched by the supplier");
        });
    } catch (err) {
      await fetch(`https://ipfs.io/ipfs/${cid2}/hello.json`)
        .then((response) => {
          return response.text();
        })
        .then(async (data) => {
          let old_obj_reject = JSON.parse(data);
          delete old_obj_reject.Supplier_Dispatched_Date;
        });
      alert("The product is not verified yet");
    }
  }

  return (
    <div>
      <Navbar />

      <form>
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

          <button className="btn btn-primary " onClick={SuppConnect}>
            VERIFY
          </button>
          <button className="btn btn-primary " onClick={dispatch}>
            DISPATCH
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Supplier;
