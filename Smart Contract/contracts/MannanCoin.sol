// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
contract MannanCoin_ICO {
    // msg.sender is a special variable in Solidity. It represents the address of the person (or account) calling the contract.
    // When the contract is deployed, the deployer (the person/account paying the gas fee to deploy the contract) becomes msg.sender.
    address public owner;

    uint public totalCoins = 1000000;

    // uint public oneEtherValForCoin = 1000;
    //as 1 ether = 1000 mannan coins and 1 ether = 10^18 wei
    uint public oneMannanCoinInWei = 1000000000000000;

    //total number of mannanCoin that is bought from the issued once(1000000)
    uint public totalCoinsBought = 0; //this we change dynamically

    //mapping

    //we will map unique investor adrress with amount of mannanCoin it has (equity)
    mapping(address => uint) equityInMannanCoin; //how much mannanCoin has
    mapping(address => uint) equityInWei; //how much Us dollar put

    //modifier

    //no need for passing parameter as msg value is accessible here as canBuy used in function
    modifier canBuyCoin() {
        require(
            ((msg.value / oneMannanCoinInWei) + totalCoinsBought) <= totalCoins,
            "We dont have that many coins left."
        );
        _;
    }

    modifier canSellCoin(uint coinsToSell) {
        require(
            equityInMannanCoin[msg.sender] > 0,
            "You must be an investor to sell coins."
        ); //not necessarily needed
        require(
            equityInMannanCoin[msg.sender] >= coinsToSell,
            "You dont have that many coins to sell."
        );
        require(
            totalCoinsBought >= coinsToSell,
            "Total coins bought cannot be less than coins to sell"
        );
        _;
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner of this contract");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    //functions

    //returns the amount of mannanCoin investor has. (this kind of functions are the one we interact with metamask or ehter wallet,
    //hence not using mapping directly)
    function equityInCoin(address _investor) external view returns (uint) {
        return equityInMannanCoin[_investor];
    }

    //returns the amount of USD investor has invested.
    function amountInWei(address _investor) external view returns (uint) {
        return equityInWei[_investor];
    }

    function buyMannanCoins() external payable canBuyCoin {
        uint coinsBought = msg.value / oneMannanCoinInWei;
        equityInMannanCoin[msg.sender] += coinsBought; //here we havre += so if same investor boughts again it gets added
        equityInWei[msg.sender] =
            equityInMannanCoin[msg.sender] *
            oneMannanCoinInWei; //this way is more dynamic and better rather than adding the value of usd(+=)

        totalCoinsBought += coinsBought;
    }

    function sellMannanCoins(
        uint coinsToSell
    ) external payable canSellCoin(coinsToSell) {
        // Calculate the amount of Ether to return
        uint weiToReturn = coinsToSell * oneMannanCoinInWei;

        // Check if the contract has enough balance to return the Ether
        require(
            address(this).balance >= weiToReturn,
            "Insufficient contract balance to complete the sale"
        );

        equityInMannanCoin[msg.sender] -= coinsToSell;
        equityInWei[msg.sender] =
            equityInMannanCoin[msg.sender] *
            oneMannanCoinInWei; //now using this way for setting is better as you can see
        totalCoinsBought -= coinsToSell;

        // Transfer the Ether back to the seller
        (bool success, ) = payable(msg.sender).call{value: weiToReturn}("");
        require(success, "Transfer failed. Unable to send Ether to seller.");
    }

    function withdraw() public onlyOwner {
        //address(this) means contract address
        (bool success, ) = owner.call{value: address(this).balance}(""); //("") Means no data payload is included that is you are not calling any function
        require(success);
    }
}
