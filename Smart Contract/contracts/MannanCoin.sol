// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
//                         *******************  CHANGING ALL THE PLACES WITH USD TO EHTER TO MAKE EASY TRANSECTIONS ***********
contract MannanCoin_ICO {
    //state variables
    //introducing total number of MannanCoin to the public on ICO for sale is

    // msg.sender is a special variable in Solidity. It represents the address of the person (or account) calling the contract.
    // When the contract is deployed, the deployer (the person/account paying the gas fee to deploy the contract) becomes msg.sender.
    address public owner;

    uint public totalCoins = 1000000;

    //just for fun, we're gonna say that $1 is 1000 hadcoin.
    //conversion value like how much 1 Mannan Coin in US values (1 dolloar = 1000 Mannan Coin )
    // uint public oneEtherValForCoin = 1000; //value of 1 dollar in mannanCoin (too cheap for now)
    //as 1 ether = 1000 mannan coins and 1 ether = 10^18 wei 
    uint public oneMannanCoinInWei = 1000000000000000;

    //total number of mannanCoin that is bought from the issued once(1000000)
    uint public totalCoinsBought = 0; //this we change dynamically

    //mapping

    //we will map unique investor adrress with amount of mannanCoin it has (equity)
    mapping(address => uint) equityInMannanCoin; //how much mannanCoin has
    mapping(address => uint) equityInWei; //how much Us dollar put

    //modifier

    //checking if a new investor can (or old one but buying again) can buy mannanCoin ( basically checking if any mannanCoin are left or not)
    // modifier canBuyCoin(uint etherInvestedForCoins) {
    //     require(
    //         ((etherInvestedForCoins * oneEtherValForCoin) + totalCoinsBought) <=
    //             totalCoins,
    //         "We dont have that many coins left."
    //     );
    //invested + total sold - total coins issued (to get how much coins left)
    // _;
    // }
    //no need for passing parameter as msg value is accessible here as canBuy used in function
    modifier canBuyCoin() {
        require(
            ((msg.value / oneMannanCoinInWei) + totalCoinsBought) <=
                totalCoins,
            "We dont have that many coins left."
        );
        _;
    }
    // modifier canSellCoin(address investor, uint coinsToSell) {
    //     require(
    //         equityInMannanCoin[investor] > 0,
    //         "You must be an investor to sell coins."
    //     ); //not necessarily needed
    //     require(
    //         equityInMannanCoin[investor] >= coinsToSell,
    //         "You dont have that many coins to sell."
    //     );
    //     require(
    //         totalCoinsBought >= coinsToSell,
    //         "Total coins bought cannot be less than coins to sell"
    //     );
    //     _;
    // }

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

    //here we can use payable if we want but it will deal in ehter and wei so we wil have to convet it like in dzon app we use payable so we did not specify the uint Cost or amount filed in buyProduct function but here instead of using payable
    //and not specifiing it what we have done is dealt in USD and specified xyz amount for buying coin
    //Buying coins
    //we need who is buying/calling this func(address),and how much is invested(usdValue)
    // function buyMannanCoins(
    //     address investor,
    //     uint usdInvested
    // ) external payable canBuyCoin(usdInvested) {
    //     uint coinsBought = usdInvested * usdValFor1Coin;
    //     equityInMannanCoin[investor] += coinsBought; //here we havre += so if same investor boughts again it gets added
    //     equityInUSD[investor] = equityInMannanCoin[investor] / usdValFor1Coin; //this way is more dynamic and better rather than adding the value of usd(+=)

    //     totalCoinsBought += coinsBought;
    // }

    function buyMannanCoins() external payable canBuyCoin {
        uint coinsBought = msg.value / oneMannanCoinInWei;
        equityInMannanCoin[msg.sender] += coinsBought; //here we havre += so if same investor boughts again it gets added
        equityInWei[msg.sender] = equityInMannanCoin[msg.sender] * oneMannanCoinInWei; //this way is more dynamic and better rather than adding the value of usd(+=)

        totalCoinsBought += coinsBought;
    }

    //func for investor to sell their coins
    // function sellMannanCoins(
    //     address investor,
    //     uint coinsToSell
    // ) external payable canSellCoin(investor, coinsToSell) {
    //     equityInMannanCoin[investor] -= coinsToSell;
    //     equityInUSD[investor] = equityInMannanCoin[investor] / usdValFor1Coin; //now using this way for setting is better as you can see
    //     totalCoinsBought -= coinsToSell;
    // }

    function sellMannanCoins(uint coinsToSell) external canSellCoin(coinsToSell)
    {
        equityInMannanCoin[msg.sender] -= coinsToSell;
        equityInWei[msg.sender] = equityInMannanCoin[msg.sender] * oneMannanCoinInWei; //now using this way for setting is better as you can see
        totalCoinsBought -= coinsToSell;
    }

    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}(""); //("") Means no data payload is included that is you are not calling any function
        require(success);
    }
}
