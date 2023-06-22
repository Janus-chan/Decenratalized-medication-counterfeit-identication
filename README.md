# Decenratalized-medication-counterfeit-identication
An Ethereum based solution for identifying counterfeit medications using smart contract in the Supply Chain

Requirements:

Metamask installed in the web Browser


>git clone https://github.com/Janus-chan/Decenratalized-medication-counterfeit-identication.git

>cd Decenratalized-medication-counterfeit-identication

open the directory in the code editor

open the terminal

install all the packages in the project by: 

>npm i

Start the local node in the hardhat:

>npx hardhat node

copy anyone private keys and go to metamask 

1.click the account

2.go to the import account

3.paste the private key copied in the hardhat local node

4.click settings

5.select network

6.add nework manualy by pasting the server url "http://127.0.0.1:8545/" and fill the details

Run the deployment script using the localhost hardhat network:

>npx hardhat run scripts/deploy.js --network localhost

Create an account in Web3.storage and paste the API keys in the actors code  in the token variable

Run the front-end by:

>npm start

