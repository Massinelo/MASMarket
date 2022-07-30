import React, { useState } from 'react';
import './index.css';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/users/signup`,
        {
          username: username,
          email: email,
          password: password,
        }
      );
      // console.log(response.data.token);  La reponse du serveur avec un clé token si tout va bien
      if (response.data.token) {
        setUser(response.data.token);
        // renvoie vers Home cad => "/"
        history.push('/');
      } else {
        alert('Une erreur est survenue');
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="signup-container">
      <h2>S'inscrire</h2>

      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <br />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <br />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <br />
        <div className="checkbox-container">
          <div className="checkbox">
            <input type="checkbox" id="subscribeNews" />
            <label for="subscribeNews">S'inscrire à notre newsletter</label>
          </div>

          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>

        <button type="submit" className="signup-button">
          S'inscrire
        </button>
        <Link to="/login">
          <div>Tu as déjà un compte ? Connecte-toi !</div>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
