# 🪙MannanCoin

This is a simple cryptocurrency blockchain implementation, allowing nodes to mine blocks, add transactions, and reward miners.

---

## 🚀 Project Overview

This blockchain simulates a cryptocurrency system with:
- Multiple nodes running on different ports (e.g., `127.0.0.1:5001`, `127.0.0.1:5002`).
- Each node has a unique node address generated using UUID4 function, which helps in distinguishing nodes and ensuring transactions are properly managed.
- This address is important because it ensures that each node can identify itself when adding transactions, mining blocks, and receiving rewards. 

- Each node can send transactions, mine blocks, and reward miners with coins.
- Transaction rewards are given to the node that mines the block

---

## 🧑‍💻 How It Works

- **Nodes**: Each node runs on a separate port and acts as a miner in the cryptocurrency network.

- **Transactions**: Users can send transactions from one address to another. Transactions are added to the node's mempool until they are included in a mined block.

- **Mining**: When a node mines a block, it includes all the transactions from its mempool. The mining node is rewarded with **MannanCoin** for validating and adding transactions to the blockchain.

- **Reward**: The node that mines the block receives a reward in **MannanCoin**, from the nodes address.

---

## 🔗 New API Endpoints Added 

### 1. **Add Transaction**
- **POST** `/add_transaction`
- Adds a new transaction to the blockchain.
- **Request Body**:
    ```json
    {
      "sender": "sender",
      "receiver": "receiver",
      "amount": "amount"
    }
    ```
- **Response**:
    ```json
    {
      "message": "This transaction will be added to block number {specific block}"
    }
    ```


### 2. **Connect Node**
- **POST** `/connect_node`
- Connects a new node to the blockchain network.
- **Request Body**:
    ```json
    {
      "nodes":{
        "address 1"
        "address 2"
        "..."
      }
    }
    ```
- **Response**:
    ```json
    {
        "message":"All the nodes are connected and the number of nodes oon the blockchain are : ",
        "total-nodes":"number of nodes"
        }
    ```


### 4. **Replace Chain**
- **GET** `/replace_chain`
- Replaces the current blockchain with a longer valid chain if available from a connected node.
- **Response**:
    ```json
    {
    "chain": [],
    "length": "lenght of chain",
    "message": "message depending on True or False"
    }
    ```
