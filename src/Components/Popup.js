import React from "react";
import "./Popup.css";

const PopupDialog = (props) => {
  let { myData } = props;

  return (
    <div className="popup-container">
      <div className="popup-dialog">
        <ul>
          <li>Medicine Name :{myData.Name}</li>
          <li>Batch Number : {myData.batchNumber}</li>
          <li>Pharmaceutical Company : {myData.Manufacturer}</li>
          <li>Manufacturing Date :{myData.manuDate}</li>
          <li>Expiry Date :{myData.expDate}</li>
        </ul>
        <p>
          Dispatched by the Manufacturer at :{" "}
          {myData.Manufacturer_Dispatched_Date
            ? myData.Manufacturer_Dispatched_Date
            : "Unkown"}{" "}
        </p>
        <p>
          verified by the supplier at :{" "}
          {myData.Supplier_verified_Date
            ? myData.Supplier_verified_Date
            : "Unkown"}{" "}
        </p>
        <p>
          Dispatched by the supplier at :{" "}
          {myData.Supplier_Dispatched_Date
            ? myData.Supplier_Dispatched_Date
            : "Unkown"}{" "}
        </p>
        <p>
          verified by the Prescriber at :{" "}
          {myData.Prescriber_verified_Date
            ? myData.Prescriber_verified_Date
            : "Unkown"}{" "}
        </p>

        <button className="close-button" onClick={props.onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PopupDialog;
