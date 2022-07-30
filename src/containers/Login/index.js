import React, { useState } from 'react';
import './index.css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const location = useLocation();

  let fromPublish;
  if (location.state) {
    fromPublish = true;
  } else {
    fromPublish = false;
  }

  // optional chaining = méthode qui revient au même que la condition ci-dessus, à revoir en détails
  // const fromPublish = location.state?.fromPublish ? true : false;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3027/users/login', {
        email: email,
        password: password,
      });
      // si le server renvoi un token on utilise la fameuse fonction setUser sinon on affiche "Une erreur est survenue"
      if (response.data.token) {
        setUser(response.data.token);

        history.push(fromPublish ? '/publish' : '/');
      } else {
        alert('Une erreur est survenue');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Se connecter</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button type="submit" className="login-button">
          Se connecter
        </button>
        <Link to="/signup">
          <div>Pas encore de compte ? Inscris-toi !</div>
        </Link>
      </form>
    </div>
  );
};

export default Login;
