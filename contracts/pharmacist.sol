// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Manufacturer.sol";
import "./supplier.sol";

contract Pharmacist is Manufacturer, Supplier {
    string PharmacistName;
    string PUserId;
    string PPassword;
    string public mssg;
    uint256 public recievedTimeByPharmacist;
    uint256 public dispatchedTimeByPharmacist;
    event verification(string message);
    event Pdispatch(string message);
  

  string revision31;
  string revision32;


function Pverify(uint _serialnumber,string memory revision31)public  
    {   
         require( medications[_serialnumber].state == SupplyChainState.DispatchedBySupplier, "medication is not yet dispatched from Supplier");
         require(keccak256(abi.encodePacked(IpfsRevision[serialnumber])) !=0);
         medications[_serialnumber].state = SupplyChainState.VerifiedByPharmacist;

        IpfsRevision[_serialnumber] = revision31;

        dispatchedTimeByPharmacist = block.timestamp;
        emit verification("vrerification Complete");
 

    }
          
       
            
}