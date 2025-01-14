import myImage from "../assets/img/currency.png";
import descImg from "../assets/img/coins.png";
import { NavLink } from "react-router-dom";
const Main = () => {
  return (
    <main className="main">
      {/* <!--==================== HOME ====================--> */}
      <section className="home section" id="home">
        <div className="home__container container grid">
          <img src={myImage} alt="image" className="home__img" />

          <div className="home__data">
            <h1 className="home__title">
              THE FUTURE <br />
              <span>FINANCE</span> IN
              <br />
              YOUR HANDS
              <br />
            </h1>
            <p className="home__description">
              <p className="home__description">
                Take control of your investments with a token that&apos;s built
                for the future. Offering fast, secure, and seamless transactions
                that empower your financial goals.
              </p>
            </p>
            <div className="home__buttons">
              <NavLink
                to="/transectMcoins"
                onClick={() => {
                  alert(
                    "\u2139 The functions Buy, Sell and Check Details are not available as it hasn't been deployed on the live test network due to insufficient test Sepolia Ether 😢. You can check the video provided in Readme.md for how it works."
                  );
                }}
                className="button"
              >
                <span>
                  <i className="ri-arrow-right-line"></i>
                </span>
                BUY TOKEN
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* <!--==================== DESCRIPTION ====================--> */}
      <section className="desc section" id="Description">
        <h2 className="section__title">
          CLOSER LOOK AT <br />
          OUR VISION
        </h2>
        <div className="desc__container container grid">
          <img src={descImg} alt="image" className="desc__img" />

          <ul className="desc__list">
            <li className="desc__item">
              <i className="ri-checkbox-fill"></i>
              <p>
                1 MannanCoin = 0.001 ETH, making it accessible for everyone.
              </p>
            </li>

            <li className="desc__item">
              <i className="ri-checkbox-fill"></i>
              <p>
                Tokens are limited to 1,000,000, ensuring exclusivity and value.
              </p>
            </li>

            <li className="desc__item">
              <i className="ri-checkbox-fill"></i>
              <p>Backed by secure smart contracts and built on Ethereum.</p>
            </li>

            <li className="desc__item">
              <i className="ri-checkbox-fill"></i>
              <p>
                Buy tokens securely with real-time tracking and transparent
                pricing.
              </p>
            </li>

            <li className="desc__item">
              <i className="ri-checkbox-fill"></i>
              <p>
                Empowering investors with exclusive access to next-gen
                cryptocurrency.
              </p>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Main;
