import React, { useState } from "react";
import { useRouter } from "next/router";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { size } from "lodash";
import { paymentCartApi } from "../../../../api/cart";
import useAuth from "../../../../hooks/useAuth";
import useCart from "../../../../hooks/useCart";

export default function FormPayment({ products, address }) {
   const [loading, setLoading] = useState(false);
   const router = useRouter();

   // usamos el hook de stripe: (lesson 140)
   const stripe = useStripe();
   const elements = useElements();

   //    --- CONTEXT ---
   const { auth, logout } = useAuth();
   const { removeAllProductsCart } = useCart();

   const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);

      // Los datos introducidos deben ser correctos: (lesson 140)
      if (!stripe || !elements) return;

      // Si existe esta info, hacemos el acuerdo de cobro obteniendo info de CardElement: (de la documentación de stripe)
      const cardElement = elements.getElement(CardElement);
      // Hacemos conexión con stripe:
      const result = await stripe.createToken(cardElement);

      if (result.error) {
         //si el resultado tiene un error:
         toast.error(result.error.message);
      } else {
         // se hizo un acuerdo de cobro, entonces llamamos al backend: (lesson 142)
         const response = await paymentCartApi(
            result.token,
            products,
            auth.idUser,
            address,
            logout
         );

         if (size(response) > 0) {
            //nota: la respuesta es el array de los productos, si es mayor a cero fue exitoso
            toast.success("Pedido completado");
            removeAllProductsCart();
            router.push("/orders");
         } else {
            toast.error("Error al realizar el pedido, intente más tarde");
         }
      }

      setLoading(false);
   };

   return (
      <form className="form-payment" onSubmit={handleSubmit}>
         <CardElement />
         <Button type="submit" loading={loading} disabled={!stripe}>
            Pagar
         </Button>
      </form>
   );
}
