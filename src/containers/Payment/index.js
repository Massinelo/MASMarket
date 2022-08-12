import React from 'react';
import './index.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../components/CheckoutForm';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_5z9rSB8XwuAOihoBixCMfL6X');

const Payment = () => {
  const location = useLocation();
  console.log(location);

  // On destructure les données qui viennent d'Offer
  const { title, price } = location.state;
  return (
    <div className="payment-body">
      <Elements stripe={stripePromise}>
        <CheckoutForm title={title} price={price} />
      </Elements>
    </div>
  );
};

export default Payment;
