// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Manufacturer{
    // string UserId;
    // string Password;
    // string CompanyName;
    uint public serialnumber;
    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;
    Medication[] public medd;
    uint[] public Sn;
    uint256 CreationTime;
    uint256  dispatchedtimeByManufacturer;
    string public  checker;
    mapping(uint => string)public   IpfsRevision;
    event Mdispatch(string message);

    enum SupplyChainState{Created,DispatchedByManufacturer,VerifiedBySupplier,DispatchedBySupplier,VerifiedByPharmacist}

    struct Medication{

        SupplyChainState state;
        string batchnumber;
        string manufacturer;
        string  name;
        uint256 Manufacturing_date;
        uint256 Expiring_date;
        bytes32  ipfsCid;

    }

    mapping(uint  => Medication)public medications;

    event product(string message, uint  _sn);


    function  addprouct( string memory _name, string memory _batchno, string memory _manufacturer, SupplyChainState  _state, uint256 _Manufacturing_date,uint256 _Expiring_date )public virtual {
         
        CreationTime = block.timestamp;
         serialnumber = uint(keccak256(abi.encodePacked(_name, _batchno, _manufacturer)));
         serialnumber %= dnaModulus;
        //  bytes32 cidBytes = bytes32(bytes(_cid));
        

         medications[serialnumber].batchnumber= _batchno;
         medications[ serialnumber].name = _name;
         medications[serialnumber].manufacturer = _manufacturer;
         medications[serialnumber].Manufacturing_date= _Manufacturing_date;
         medications[serialnumber].Expiring_date= _Expiring_date;
         medications[serialnumber].state =  _state;
        //  medications[serialnumber].ipfsCid =  cidBytes;
         
    
         Sn.push(serialnumber);
         emit product("serial number of the medication", serialnumber);
         

    }


     function Serialnumbers()public view returns(uint)
     {
         return serialnumber;
     }


    

    function  Medicine_mapper_first(string memory  _CID11) public {

         IpfsRevision[serialnumber] = _CID11;


     }

   

    function Mandispatch(uint _serialnumber,string memory  _CID12)public {
        require( medications[_serialnumber].state == SupplyChainState.Created, "medication is not yet upload in chain");

       dispatchedtimeByManufacturer = block.timestamp;
        medications[_serialnumber].state= SupplyChainState.DispatchedByManufacturer;
        IpfsRevision[_serialnumber] = _CID12;//_Revision12
        emit Mdispatch("Dispatching complete successfully");
    }
  
}

 


