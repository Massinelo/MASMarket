import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import axios from 'axios';
import hero from '../../assets/images/hero.jpg';
import Loader from 'react-loader-spinner';

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_URL}/offers`);
      // console.log(response);
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return isLoading ? (
    <Loader
      type="Puff"
      color="#2cb1ba"
      height={100}
      width={100}
      className="loader"
    />
  ) : (
    <>
      <div className="hero-picture">
        <img src={hero} alt="hero" className="hero" />
      </div>

      <div className="home-flex">
        {data.map((offer, index) => {
          return (
            <Link to={`offer/${offer._id}`} key={offer._id} className="link">
              <div className="annonce-box">
                <div className="avaname">
                  {offer.owner.account.avatar ? (
                    <img
                      src={offer.owner.account.avatar.secure_url}
                      alt="avatar"
                      className="avatar"
                    />
                  ) : (
                    <div className="no-avatar"></div>
                  )}
                  <div className="username">{offer.owner.account.username}</div>
                </div>

                <div>
                  {
                    <img
                      src={offer.product_image.secure_url}
                      alt="images-annonces"
                      className="home-offers-pic"
                    />
                  }
                </div>

                <div className="offer-infos">
                  <span className="home-price">{offer.product_price} €</span>
                  <span>{offer.product_details[1].TAILLE}</span>
                  <span>{offer.product_details[0].MARQUE}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Home;
