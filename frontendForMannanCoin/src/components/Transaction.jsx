import { useState, useEffect } from "react";
import { ethers } from "ethers";

//utils
import abi from "../utils/abi.json";
import config from "../utils/config.json";

const Transaction = () => {
  // State variables for Connection
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [dApp, setdApp] = useState(null);

  // State variables for token details
  const [totalCoins, setTotalCoins] = useState(0);
  const [oneCoinamountInEther, setAmountInEther] = useState(0);
  const [totalCoinsleft, setTotalCoinsLeft] = useState(0);

  // State variables for user equity
  const [equityInCoins, setequityInCoins] = useState(0);
  const [equityInEther, setequityInEther] = useState(0);

  // State variable for frontend coin interactions
  // const [isLoading, setIsLoading] = useState(false);
  const [coinValue, setCoinValue] = useState(0);

  const loadContractData = async () => {
    try {
      //connect to BC
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);

      //getting what network information such as : chainID
      const network = await provider.getNetwork();
      // if (network.name !== "sepolia") {
      //   alert(
      //     "You are not connected to Sepolia. Please switch to Sepolia to avoid using real Ether."
      //   );
      // }
      //this gets you what network u are using here(localhost) for npx harhat node

      //Creating contract....
      const dApp = new ethers.Contract(
        config[network.chainId].MannanCoin.address,
        abi,
        provider
      );
      setdApp(dApp);

      //getting signer from provider
      const signer = await provider.getSigner();
      setSigner(signer);
      console.log(signer);

      const totalCoins = await dApp.totalCoins();
      setTotalCoins(Number(totalCoins));

      const oneCoinamountInWei = await dApp.oneMannanCoinInWei();
      setAmountInEther(ethers.formatUnits(oneCoinamountInWei, "ether"));

      const totalCoinsBought = await dApp.totalCoinsBought();
      const totalCoinsleft = Number(totalCoins) - Number(totalCoinsBought);
      setTotalCoinsLeft(totalCoinsleft);
    } catch (error) {
      console.error("Error loading contract data:", error);
    }
  };

  const buyHandler = async (e) => {
    e.preventDefault(); // Prevent form submission

    //Checks :
    if (!provider) {
      alert(
        "❌ Blockchain provider is not connected. Please refresh the page or reconnect your wallet."
      );
      return;
    }
    if (coinValue === "" || Number(coinValue) <= 0) {
      alert("❌ Please enter a valid positive number for the coins.");
      return;
    }

    try {
      // setIsLoading(true); // Start loading
      //converting the value got from form to wei
      const coinValueInWei = ethers.parseUnits(coinValue.toString(), "ether");
      console.log(coinValueInWei);

      let transactions = await dApp
        .connect(signer)
        .buyMannanCoins({ value: coinValueInWei });
      await transactions.wait();
      console.log("✅ Transaction successful!");

      //refreshing the data after buyMannanCoin
      await loadContractData();
      await checkAccountInfo();
      alert("✅ Purchase successful! Data has been updated.");
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("❌ Transaction failed. Refresh Manually.");
    }
    // finally {
    //   setIsLoading(false); // Stop loading
    // }
  };
  const sellCoinHandler = async (e) => {
    e.preventDefault();

    //checks :
    if (!provider) {
      alert(
        "❌ Blockchain provider is not connected. Please refresh the page or reconnect your wallet."
      );
      return;
    }
    if (coinValue === "" || Number(coinValue) <= 0) {
      alert("❌ Please enter a valid positive number for the coins.");
      return;
    }
    try {
      let transactions = await dApp.connect(signer).sellMannanCoins(coinValue);
      await transactions.wait();
      console.log("✅ Transaction successful!");
      //refreshing the data after sellCoin
      await loadContractData();
      await checkAccountInfo();
      alert("✅ Sell successful! Data has been updated.");
    } catch (error) {
      console.error("❌ Transaction failed:", error);
      alert("❌ Transaction failed. Refresh Manually.");
    }
  };
  const checkAccountInfo = async () => {
    //checks:
    if (!dApp) {
      alert("❌ Please refresh the page or reconnect your wallet dApp not set");
      return;
    }
    if (!signer) {
      alert(
        "❌ Please refresh the page or reconnect your wallet Signer not set."
      );
      return;
    }
    try {
      //getting users/buyers/sellers address
      const userAddress = await signer.getAddress();

      //checking in contract if user has coins and Ether
      const equityInCoins = await dApp.equityInCoin(userAddress);
      setequityInCoins(Number(equityInCoins));
      const equityInWei = await dApp.amountInWei(userAddress);
      setequityInEther(ethers.formatUnits(equityInWei, "ether"));
    } catch (error) {
      console.log(error);
      alert("❌ Check Info function failed. Refresh Manually.");
    }
  };
  useEffect(() => {
    loadContractData();
  }, []); //read notes.txt point 1

  return (
    <section className="desc section" id="desc">
      <h2 className="section__title">
        BUY AND SELL
        <br />
        MANNANCOIN HERE
      </h2>
      <div className="desc__container container grid">
        <div className="accountDetail">
          <h3>ACCOUNT OVERVIEW</h3>
          <p>Total MannanCoins Owned: {equityInCoins} </p>
          <p>Total ETH Spent: {equityInEther}</p>
          <button onClick={checkAccountInfo}>Check Details</button>
          <div className="accountNote">
            <li className="desc__item">
              <i className="ri-checkbox-fill"></i>
              <p>The tokens or coins displayed here are not real.</p>
            </li>
            <li className="desc__item">
              <i className="ri-checkbox-fill"></i>
              <p>
                These are for testing and learning purposes only. Do not use
                real ether or transfer it to this network&apos;s account.
              </p>
            </li>
          </div>
        </div>
        <div className="form-container">
          <form action="#">
            <div className="amount">
              <label htmlFor="fname"> Enter Coins:</label>
              <input
                type="number"
                id="fname"
                onChange={(e) => {
                  setCoinValue(e.target.value);
                }}
                value={coinValue}
                placeholder="Enter number of coins"
              />
            </div>
            <div className="msg">1 MannanCoin = {oneCoinamountInEther} ETH</div>
            <div className="button-container">
              <button onClick={buyHandler}>BUY COIN</button>
              <button onClick={sellCoinHandler}>SELL COIN</button>
            </div>
            <div className="checkDetails">
              <p>Total MannanCoin Issued: {totalCoins} </p>
              <p>Total MannanCoin left:{totalCoinsleft}</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Transaction;
