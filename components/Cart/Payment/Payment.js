import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_TOKEN } from "../../../utils/constants";
import FormPayment from "./FormPayment";

// Lesson 138: de la documentación https://stripe.com/docs/stripe-js/react
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(STRIPE_TOKEN);

export default function Payment({ products, address }) {
   return (
      <div className="payment">
         <div className="title">Pago</div>
         <div className="data">
            <Elements stripe={stripePromise}>
               <FormPayment products={products} address={address} />
            </Elements>
         </div>
      </div>
   );
}
