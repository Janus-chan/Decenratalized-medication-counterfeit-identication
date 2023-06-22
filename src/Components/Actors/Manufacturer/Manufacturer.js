import { React, useState} from "react";
import { Web3Storage, Blob, File } from "web3.storage";
import Navbar from "../../Navbar";
import "./Manufacturer.css";
import { ethers } from "ethers";
import ManufacturerABI from "../../../Json/Public.json";

function Manufacturer() {
  let usdcContract;
  let usdc;
  let cid;
  let giveSerialnumberReal;
  const token = "YOUR_WEB3STORAGE_TOKEN"
 
    const client = new Web3Storage({ token });

  const [Name, setName] = useState("");
  const [batchNumber, setbatchNumber] = useState("");
  const [manufacturer, setmanufacturer] = useState("");
  const [manuDate, setmanuDate] = useState("");
  const [expDate, setexpDate] = useState("");
  const [dispContract, setdispContract] = useState(null);
  const [CIDs, setCID] = useState("");
  const [_giveSerialnumberReal, _setgiveSerialnumberReal] = useState("");

  const Connect = async (e) => {
    e.preventDefault();

    let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    (async function () {
      let userAddress = await signer.getAddress();
      console.log("Your wallet is " + userAddress);
    })();

    const MainABI = ManufacturerABI.abi;

    usdc = {
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abi: ManufacturerABI,
    };

    usdcContract = new ethers.Contract(usdc.address, MainABI, signer);

    // console.log(usdcContract); <=contract functions

    setdispContract(usdcContract);
    if (Name === "") {
      alert("Please fill the Name field");
      return;
    }
    if (batchNumber === "") {
      alert("Please fill the Batch number");
      return;
    }
    if (manufacturer === "") {
      alert("Please fill the Manufacturer field");
      return;
    }
    if (manuDate === "") {
      alert("Please fill the Manufacturing Date ");
      return;
    }
    if (expDate === "") {
      alert("Please fill the Expiring Date ");
      return;
    }

    // Get the current manufacturing timestamp in milliseconds
    const newManuDate = Date.now();

    // Get the expiring date timestamp
    const dateString = expDate;
    const date = new Date(dateString);
    const newexpDate = date.getTime();

    const setProducts = await usdcContract.addprouct(
      Name,
      batchNumber,
      manufacturer,
      0,
      newManuDate,
      newexpDate
    );
    const transactionReceipt = await setProducts.wait(1);
    let giveSerialnumber = await usdcContract.Serialnumbers();
    giveSerialnumberReal = giveSerialnumber.toString();

    let Card = function (Name, batchNumber, manufacturer, manuDate, expDate) {
      this.Name = Name;
      this.batchNumber = batchNumber;
      this.Manufacturer = manufacturer;
      this.manuDate = manuDate;
      this.expDate = expDate;
    };

    let CardFun = new Card(Name, batchNumber, manufacturer, manuDate, expDate);

    const blob = new Blob([JSON.stringify(CardFun)], {
      type: "application/json",
    });

    const files = [
      new File(["contents-of-file-1"], "plain-utf8.txt"),
      new File([blob], "hello.json"),
    ];
    cid = await client.put(files);
    setCID(cid);

    const setMapper = await usdcContract.Medicine_mapper_first(cid);
    const MapperReceipt = await setMapper.wait(1);
    const giveMeds = await usdcContract.IpfsRevision(giveSerialnumberReal);
    alert("The Generated serial Number is : " + giveSerialnumberReal);
    _setgiveSerialnumberReal(giveSerialnumberReal);

    setCID(giveMeds);
  };

  // Dispatch Function

  async function Dispatch(e) {
    e.preventDefault();

    await fetch(`https://ipfs.io/ipfs/${CIDs}/hello.json`)
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
          Manufacturer_Dispatched_Date: formattedToday,
          ...old_obj,
        };

        const blob = new Blob([JSON.stringify(new_obj)], {
          type: "application/json",
        });

        const files = [
          new File(["contents-of-file-1"], "plain-utf8.txt"),
          new File([blob], "hello.json"),
        ];
        let cid1 = await client.put(files);

        const setManuDis = await dispContract.Mandispatch(
          _giveSerialnumberReal,
          cid1
        );
        const setManuDisReceipt = await setManuDis.wait(1);

        const giveMeds2 = await dispContract.IpfsRevision(
          _giveSerialnumberReal
        );

        // console.log("the Dispatched CID is ",giveMeds2);
      })
      .catch((err) => {
        alert("Can't be dispatched until the product is added");
      });
    alert("Product is dispatched");
  }

  async function setmanuDateField(e) {
    setmanuDate(e.target.value);
  }

  async function setexpDateField(e) {
    setexpDate(e.target.value);
  }

  async function setNameHandler(e) {
    setName(e.target.value);
  }

  function setbatchNumberHandler(e) {
    setbatchNumber(e.target.value);
  }

  function setmanufacturerHandler(e) {
    setmanufacturer(e.target.value);
  }

  return (
    <div>
      <Navbar />
      <center>
        {" "}
        <h3>Manufacturer</h3>
      </center>

      <form>
        <fieldset className="Manufacturer-main">
          <div className="form-group ">
            <fieldset>
              <label className="form-label mt-4">Name</label>
              <input
                type="text"
                className="form-control"
                id="inputDefault"
                onChange={setNameHandler}
              />
            </fieldset>
          </div>

          <div className="form-group ">
            <fieldset>
              <label className="form-label mt-4">Batch Number</label>
              <input
                type="Number"
                className="form-control"
                id="inputDefault"
                onChange={setbatchNumberHandler}
              />
            </fieldset>
          </div>

          <div className="form-group ">
            <fieldset>
              <label className="form-label mt-4">Manufacturer</label>
              <input
                type="text"
                className="form-control"
                id="inputDefault"
                onChange={setmanufacturerHandler}
              />
            </fieldset>
          </div>

          <div className="form-group  ">
            <fieldset>
              <label className="form-label mt-4">Manufacturing Date</label>
              <input
                type="date"
                className="form-control"
                onChange={setmanuDateField}
                value={manuDate}
              />
            </fieldset>
          </div>

          <fieldset>
            <label className="form-label mt-4">Expiring Date</label>
            <input
              type="date"
              onChange={setexpDateField}
              value={expDate}
              className="form-control"
            />
          </fieldset>

          <button onClick={Connect} className="btn btn-primary ">
            ADD PRODUCT
          </button>

          <button className="btn btn-primary " onClick={Dispatch}>
            DISPATCH
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Manufacturer;

// refernces

// ("Paracetamol","jas123","pfizer","0")
