// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Manufacturer.sol";
import "./supplier.sol";
import "./pharmacist.sol";


contract Public is Manufacturer, Supplier, Pharmacist  {

event Pubverification(string message);
   




    function History(uint _serialnumber)public view returns(Medication memory,string memory,uint256, uint256, uint256)
    {
          require( medications[_serialnumber].state == SupplyChainState.VerifiedByPharmacist, "medication is not yet Verified from Pharmacist");
        require(keccak256(abi.encodePacked(IpfsRevision[serialnumber])) !=0);        
        return (medications[_serialnumber],IpfsRevision[serialnumber],  dispatchedtimeByManufacturer, dispatchedtimeBySupplier, dispatchedTimeByPharmacist);
    }
    

}