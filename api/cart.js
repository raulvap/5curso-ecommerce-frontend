import { toast } from "react-toastify";
import { size, includes, remove } from "lodash";
import { BASE_PATH, CART } from "../utils/constants";
import { authFetch } from "../utils/fetch";

// Función para obtener todos los productos del carrito: (lesson 124)
export function getProductsCart() {
   // del local storage obtenemos la constante "Cart":
   const cart = localStorage.getItem(CART);

   if (!cart) {
      return null;
   } else {
      // Vamos a guardar un string de los productos:
      const products = cart.split(",");
      return products;
   }
}

// Función para añadir productos al carrito: (lesson 125)
export function addProductCart(product) {
   // Primero verificamos que no haya productos al carrito
   const cart = getProductsCart();

   if (!cart) {
      // Si no hay productos, lo añadimos:
      localStorage.setItem(CART, product);
      toast.success("Producto agregado al carrito");
   } else {
      // Si si hay, entonces buscamos que no esté repetido: (includes viene de lodash, regresa true o false)
      const productFound = includes(cart, product);
      if (productFound) {
         toast.warning("Este producto ya está en el carrito");
      } else {
         // Si el producto no está en el carrito, añadimos el producto
         cart.push(product);
         localStorage.setItem(CART, cart);
         toast.success("Producto agregado correctamente");
      }
   }
}

// función para contar los productos en el carrito (lesson 126)
export function countProductsCart() {
   // Obtenemos los productos del carrito:
   const cart = getProductsCart();

   if (!cart) {
      return 0;
   } else {
      return size(cart);
   }
}

// función para quitar productos del carrito: (lesson 131)
export function removeProductCart(product) {
   // obtenermos todos los productos del carrito
   const cart = getProductsCart();

   // remove viene de lodash, quitar elemento del array
   remove(cart, (item) => {
      // quitamos del array cart, el producto que nos llega
      return item === product;
   });

   if (size(cart) > 0) {
      // ahora si cart tiene elementos, guardamos el nuevo array que ya no tiene el product a quitar
      localStorage.setItem(CART, cart);
   } else {
      // si no hay elementos, quitamos el objeto cart
      localStorage.removeItem(CART);
   }
}

export async function paymentCartApi(token, products, idUser, address, logout) {
   try {
      const addressShipping = address;
      delete addressShipping.user;
      delete addressShipping.createdAt;

      const url = `${BASE_PATH}/orders`;
      const params = {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            token,
            products,
            idUser,
            addressShipping,
         }),
      };
      const result = await authFetch(url, params, logout);
      return result;
   } catch (error) {
      console.log(error);
      return null;
   }
}

export function removeAllProductsCart() {
   localStorage.removeItem(CART);
}
