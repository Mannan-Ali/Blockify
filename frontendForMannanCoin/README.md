# 🪙 MannanCoin
This is the frontend for **MannanCoin Token ICO**. MannanCoin is a cryptocurrency token designed and deployed using Solidity smart contracts. This application allows users to interact with MannanCoin functions such as **buying tokens, selling tokens**.

🔗[**`Live Preview`**](https://mannancoin.vercel.app/)

⚠️ **Note** **:** Due to a lack of test ethers, the smart contract could not be deployed on the **Test Network**. As a result, features such as **checkBalance**, **buy**, and **sell** are currently non-functional in this preview.

## 🚀 Installation and Setup

Follow these steps to get the **MannanCoin Token ICO** up and running locally:

### Prerequisites:
- **Node.js** (v14 or above):  
  A JavaScript runtime required for building and running the application.  
  [📥 Download Node.js from here](https://nodejs.org/en/download)

- **npm**:  
  Node.js's package manager, typically installed alongside Node.js.  
  [📘 Learn more about npm](https://docs.npmjs.com/)

- **Metamask** or another Ethereum wallet extension:  
  A browser extension for interacting with the Ethereum blockchain.  
  [📥 Download Metamask from here](https://metamask.io/)

- **Hardhat**:  
  A development environment to compile, deploy, test, and debug Ethereum software.  
  [📘 Learn more and get started with Hardhat here](https://hardhat.org/getting-started/)

## Setup Locally

Clone the project

```bash
  git clone https://github.com/Mannan-Ali/Blockify.git
```

Go to the project directory

```bash
  cd frontendForMannanCoin
```

Install dependencies

```bash
  npm install
```

### Configure the Smart Contract

- Navigate to the **Smart Contract** folder in another terminal :

    ```bash
    cd "Smart Contract"
    ```
- Install the dependencies for the smart contract:

    ```bash
    npm install
    ```
- In one terminal or bash window, start the Hardhat local node:

    ```bash
    npx hardhat node
    ```
- In another terminal or bash window, deploy the smart contract using Hardhat Ignition:

    ```bash
    npx hardhat ignition deploy ignition/modules/MannanCoin.js --network localhost
    ```


**Start the Frontend Server**

Now go back to the first terminal/bash window and start the server
```bash
 npm run dev
```

**Run Tests** 

Navigate to the **Smart Contract** folder and run the following command if you want to test the Smart Contract before deployment.  

```bash
npx hardhat test
```
