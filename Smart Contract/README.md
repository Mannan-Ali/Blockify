# 🪙 MannanCoin ICO

The **MannanCoin ICO** smart contract facilitates secure buying and selling of **MannanCoins** on the Ethereum blockchain. It ensures real-time equity tracking and token supply management, making it an efficient and transparent solution for decentralized token sales.

## ⚙️ Setup Locally

Follow these steps to set up and deploy the **MannanCoin ICO** smart contract locally:

**Clone the Repository**

```bash
  git clone https://github.com/Mannan-Ali/Blockify.git
```

Navigate to the **Smart Contract** folder:

```bash
  cd "Smart Contract"
```

Install the dependencies for the smart contract:

```bash
   npm install
```


To test the contract run:

```bash
    npx hardhat test
```

**To deploy the contract run:**

In one terminal/bash window

```bash
    npx hardhat node
```

Open a new terminal/bash window and run:

```bash
  npx hardhat ignition deploy ignition/modules/MannanCoin.js --network localhost
```