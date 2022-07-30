import React, { useState } from 'react';
import './index.css';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = ({ title, price }) => {
  // Le state qui va indiqué si la transaction c'est bien passé
  const [completed, setCompleted] = useState(false);

  // Va nous servir pour faire la requête vers Stripe
  const stripe = useStripe();
  //useElements => fonction qui sert à recuperer ce qui est rentré dans le formulaire
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // On récupère les données bancaires rentrées depuis CardElement
    const cardElement = elements.getElement(CardElement);

    //On fait une requête vers l'api Stripe (on veut recevoir un token)
    const stripeResponse = await stripe.createToken(cardElement, {
      name: '428492FJEDLZ90',
    });

    // on stock le fameux token dans une const
    const stripeToken = stripeResponse.token.id;

    // requête axios vers notre back en envoyant le token, un titre et un prix.
    const response = await axios.post(
      'https://lereacteur-vinted-api.herokuapp.com/payment',
      { token: stripeToken, title: title, amount: price }
    );

    if (response.data.status === 'succeeded') {
      setCompleted(true);
    }
  };

  return (
    <div>
      {completed ? (
        <div>
          <p>Merci pour votre achat !</p>
        </div>
      ) : (
        <div className="payment-body">
          <div className="payment-box">
            <form onSubmit={handleSubmit}>
              <p>
                Il ne vous reste plus qu'un étape pour vous offrir{' '}
                <b>{title}</b>. Vous allez payer <b>{price} €</b> (frais de
                protection et frais de port inclus).
              </p>
              <div className="divider"></div>
              <CardElement />
              <button type="submit" className="valider-payment" disabled>
                Pay
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
