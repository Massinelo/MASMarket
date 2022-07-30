import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import Loader from 'react-loader-spinner';

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3027/offer/${id}`);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <Loader
      type="Puff"
      color="#2cb1ba"
      height={100}
      width={100}
      className="loader"
    />
  ) : (
    <div className="offer-body">
      <div className="offer-container">
        <div>
          <img
            src={data.product_image.secure_url}
            alt=""
            className="offer-picture"
          />
        </div>
        <div className="white-box">
          <div className="box1">
            <div className="offer-price">{data.product_price} €</div>
            <div className="offer-lists">
              {data.product_details.map((elem, index) => {
                const keys = Object.keys(elem); // renvoie un tableau avec la clé de l'objet en cours
                return (
                  <div key={index} className="offer-list">
                    <span className="offer-keys">{keys[0]}</span>
                    <span className="offer-value">{elem[keys[0]]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="divider" />

          <div className="box2">
            <div className="product-name">{data.product_name}</div>
            <div className="product-description">
              {data.product_description}
            </div>
            <div className="avatar-username">
              {data.owner.account.avatar ? (
                <img
                  src={data.owner.account.avatar.secure_url}
                  alt="avatar"
                  className="avatar"
                />
              ) : (
                <div className="no-avatar"></div>
              )}

              <div>{data.owner.account.username}</div>
            </div>
            <Link
              to={{
                pathname: '/payment',
                state: { title: data.product_name, price: data.product_price },
              }}
            >
              <button className="buy-button">Acheter</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
