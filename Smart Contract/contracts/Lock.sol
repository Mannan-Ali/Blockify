// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract MannanCoin_iCO {
    //state variables
    //introducing total number of MannanCoin to the public on ICO for sale is

    //For Remix:
    //(
    // address public sender;
    // constructor(){
    //     sender = msg.sender;
    // }
    //  )

    uint public totalCoins = 1000000;

    //conversion value like how much 1 Mannan Coin in US values (1 dolloar = 1000 Mannan Coin )
    uint public usdValFor1Coin = 1000; //value of 1 dollar in mannanCoin (too cheap for now)

    //total number of mannanCoin that is bought from the issued once(1000000)
    uint public totalCoinsBought = 0; //this we change dynamically

    //mapping

    //we will map unique investor adrress with amount of mannanCoin it has (equity)
    mapping(address => uint) equityInMannanCoin; //how much mannanCoin has
    mapping(address => uint) equityInUSD; //how much Us dollar put

    //modifier

    //checking if a new investor can (or old one but buying again) can buy mannanCoin ( basically checking if any mannanCoin are left or not)
    modifier canBuyCoin(uint usdInvestedForCoins) {
        require(
            ((usdInvestedForCoins * usdValFor1Coin) + totalCoinsBought) <=
                totalCoins,
            "We dont have that many coins left."
        );
        //invested + total sold - total coins issued (to get how much coins left)
        _;
    }

    //functions

    //returns the amount of mannanCoin investor has. (this kind of functions are the one we interact with metamask or ehter wallet,
    //hence not using mapping directly)
    function equityInCoin(address _investor) external view returns (uint) {
        return equityInMannanCoin[_investor];
    }

    //returns the amount of USD investor has invested.
    function amountInUSD(address _investor) external view returns (uint) {
        return equityInUSD[_investor];
    }

    //Buying coins
    //we need who is buying/calling this func(address),and how much is invested(usdValue)
    function buyMannanCoins(address investor,uint usdInvested) external canBuyCoin(usdInvested) {
        uint coinsBought = usdInvested * usdValFor1Coin;
        equityInMannanCoin[investor] += coinsBought; //here we havre += so if same investor boughts again it gets added
        equityInUSD[investor] = equityInMannanCoin[investor] / usdValFor1Coin; //this way is more dynamic and better rather than adding the value of usd(+=)

        totalCoinsBought += coinsBought;
    }

    //func for investor to sell their coins 
    function sellMannanCoins(address investor,uint coinsToSell) external  {
        equityInMannanCoin[investor] -= coinsToSell; 
        equityInUSD[investor] = equityInMannanCoin[investor] / usdValFor1Coin; //now using this way for setting is better as you can see 

        totalCoinsBought -= coinsToSell;
    }
}
