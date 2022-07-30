import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cookie from 'js-cookie';
//import des composants (containers) :
import Home from './containers/Home';
import Offer from './containers/Offer';
import Signup from './containers/Signup';
import Login from './containers/Login';
import Publish from './containers/Publish';
import Payment from './containers/Payment';
// import des composants (components)
import Header from './components/Header';

//Mettre en place la navigation =
// 1. Installer et importer react-router
// 2. Lister toutes les pages de l'application web
// 3. Crée un composant par pages
// 4. Crée des liens entre les pages

//HTML
//ETATS
//INTERACTIONS
//CSS

function App() {
  // nb : Tout ce qui concerne l'authentification se passe dans App.js
  // On crée un state qu'on initialise à la valeur du cookie si il existe, ou à null si il est absent
  const [token, setToken] = useState(Cookie.get('userToken') || null);

  const setUser = (tokenReady) => {
    if (tokenReady) {
      //Créer un cookie et modifie le state (qui sert pour l'affichage conditionnel du header)
      Cookie.set('userToken', tokenReady);
      setToken(tokenReady);
    } else {
      // Supprime le cookie et passe le state à null
      Cookie.remove('userToken');
      setToken(null);
    }
  }; // en gros si la fonction setUser recoit un token en paramètre elle va :
  // Créer un cookie et mettre à jour le state (avec cette même valeur)
  // Si le paramètre est null :
  // Ou supprime le cookie et passe le state à null

  return (
    <div>
      <Router>
        <Header token={token} setUser={setUser} />
        <Switch>
          <Route path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route path="/signup">
            <Signup setUser={setUser} />
          </Route>
          <Route path="/offer/:id">
            <Offer />
          </Route>
          <Route path="/publish">
            <Publish token={token} />
          </Route>
          <Route path="/payment">
            <Payment />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
