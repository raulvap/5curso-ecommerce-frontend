import { createContext } from "react";

// Creamos el context, con los parámetros que va a tener: (lesson 123)
const CartContext = createContext({
   productsCart: 0,
   addProductCart: () => null,
   removeProductCart: () => null,
   getProductsCart: () => null,
   removeAllProductsCart: () => null,
});

export default CartContext;
// Ahora el siguiente paso es crear el hook (hooks/useCart) que va a utilzar este context con sus parámetros
