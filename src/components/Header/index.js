import React from 'react';
import './index.css';
import { FaSearch } from 'react-icons/fa';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';

const Header = ({ token, setUser }) => {
  return (
    <div className="header">
      <div className="wrapper">
        <div className="header-flex">
          <Link to="/">
            <img src={logo} alt="vinted-logo" />
          </Link>
          <div className="search-div">
            <input
              type="text"
              placeholder="Rechercher des articles"
              className="search-input"
            />
            <FaSearch className="header-search-icon" />
          </div>

          <div className="header-button">
            {' '}
            {token ? (
              <button
                className="logout"
                onClick={() => {
                  setUser(null);
                }}
              >
                Se déconnecter
              </button>
            ) : (
              <div>
                <div>
                  <Link to="/signup">
                    <button className="button">S'inscrire</button>
                  </Link>

                  <Link to="/login">
                    <button className="button">Se connecter</button>
                  </Link>
                </div>
              </div>
            )}
            <div>
              <Link to="/publish" token={token}>
                <button className="vends">Vends tes articles</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
