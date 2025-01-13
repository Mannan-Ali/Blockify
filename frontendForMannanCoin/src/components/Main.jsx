import myImage from "../assets/img/currency.png";
import { NavLink } from "react-router-dom";
const Main = () => {
  return (
    <main className="main">
      {/* <!--==================== HOME ====================--> */}
      <section className="home section">
        <div className="home__container container grid">
          <img src={myImage} alt="image" className="home__img" />

          <div className="home__data">
            <h1 className="home__title">
              THE FUTURE <br/>
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
              <NavLink to="/" className="button">
                <span>
                  <i className="ri-arrow-right-line"></i>
                </span>
                BUY TOKEN
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
