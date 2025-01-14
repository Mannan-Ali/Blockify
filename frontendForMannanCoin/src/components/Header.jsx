/* eslint-disable react/prop-types */
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";
import { HashLink } from "react-router-hash-link";
// rafc
const Header = (props) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  //// Get the current location to track the URL hash for functioning of isActive
  const location = useLocation();
  //here we are checking is hash matches the current location then the class will be applied on Description
  const isActive = (hash) => {
    return location.hash === hash;
  };

  //to toggle the visibility of menu bar
  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };
  const closeMenu = () => {
    setIsMenuVisible(false);
  };

  //connecting to users Ethereum Wallet
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const ac = ethers.getAddress(accounts[0]);
    props.setAccount(ac);
  };
  return (
    <header className="header" id="header">
      <nav className="nav container">
        <NavLink to="/" className="nav__logo">
          <i className="ri-btc-fill"></i>
          <span>MCOIN</span>
        </NavLink>

        <div className={`nav__menu ${isMenuVisible ? "show-menu" : ""}`}>
          <ul className="nav__list">
            <li className="nav__item">
              <HashLink
              smooth
                to="/#home"
                end
                className={
                  isActive("#home")
                    ? "nav__link active-link"
                    : "nav__link"
                }
                onClick={closeMenu}
              >
                Home
              </HashLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/transectMcoins"
                className={({ isActive }) =>
                  isActive ? `nav__link active-link` : `nav__link`
                }
                onClick={() => {
                  closeMenu(); 
                  alert("\u2139 The functions Buy, Sell and Check Details are not available as it hasn't been deployed on the live test network due to insufficient test Sepolia Ether 😢. You can check the video provided in Readme.md for how it works.");
                }}
              >
                Buy Token
              </NavLink>
            </li>
            <li className="nav__item">
              <HashLink
                smooth
                to="/#Description"
                className={
                  isActive("#Description")
                    ? "nav__link active-link"
                    : "nav__link"
                }
                onClick={closeMenu}
              >
                Description
              </HashLink>
            </li>
          </ul>

          {/* <!-- close button --> */}
          <div className="nav__close" onClick={closeMenu}>
            <i className="ri-close-line"></i>
          </div>
        </div>

        <div className="nav__actions">
          {props.account ? (
            <p type="button" className="nav__connect">
              {/* this is how you show not the whole account but the ... one  */}
              {props.account.slice(0, 2) + "..." + props.account.slice(39, 42)}
            </p>
          ) : (
            <p className="nav__connect" onClick={connectHandler}>LINK</p>
          )}

          {/* <!-- Toggle Button --> */}
          <div className="nav__toggle" onClick={toggleMenu}>
            <i className="ri-menu-line"></i>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
