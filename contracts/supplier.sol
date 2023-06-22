// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Manufacturer.sol";

contract Supplier is Manufacturer {


uint256 public recievedtimeBySupplier;
uint256 public dispatchedtimeBySupplier;
event Status(string message);

string revision22;
//event Sdispatch(string message);


    function verify(uint _serialnumber,string memory revision21)public  
    {   
         require( medications[_serialnumber].state == SupplyChainState.DispatchedByManufacturer, "medication is not dispatched yet from manufacturer");
         //require(keccak256(abi.encodePacked(IpfsRevision[serialnumber])) == (keccak256(abi.encodePacked(checker))),"product is counterfeit");
        require(keccak256(abi.encodePacked(IpfsRevision[serialnumber])) !=0);
         medications[_serialnumber].state = SupplyChainState.VerifiedBySupplier;

      
        IpfsRevision[_serialnumber] = revision21;
        emit Status("verfication Complete");


    }
    
    

    function Supdispatch(uint _serialnumber,string memory revision22)public {
         require( medications[_serialnumber].state == SupplyChainState.VerifiedBySupplier, "medication is not yet upload in chain");
       dispatchedtimeBySupplier = block.timestamp;
        medications[_serialnumber].state= SupplyChainState.DispatchedBySupplier;

        IpfsRevision[_serialnumber] = revision22;

         emit Status("Dispatching complete successfully");
    }


    



    }

    



