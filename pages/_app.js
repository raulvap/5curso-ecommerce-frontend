import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import jwtDecode from "jwt-decode";

// --- CONTEXT ---
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";

// --- API ---
import { setToken, getToken, removeToken } from "../api/token";
import {
   getProductsCart,
   addProductCart,
   countProductsCart,
   removeProductCart,
   removeAllProductsCart,
} from "../api/cart";

// --- STYLES ---
import "semantic-ui-css/semantic.min.css";
import "../scss/global.scss";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MyApp({ Component, pageProps }) {
   const [auth, setAuth] = useState(undefined);
   const [totalProductsCart, setTotalProductsCart] = useState(0);
   const [reloadUser, setReloadUser] = useState(false);
   const [reloadCart, setReloadCart] = useState(false);
   const router = useRouter();

   useEffect(() => {
      // Para obtener los datos del token en el LocalStorage (lesson 59)
      const token = getToken();
      if (token) {
         // si hay token, el usuario está loggeado, y guardamos los datos en el context
         setAuth({
            token,
            idUser: jwtDecode(token).id,
         });
      } else {
         // si no hay token, el usuario no está loggeado
         setAuth(null);
      }
      setReloadUser(false);
   }, [reloadUser]);

   useEffect(() => {
      // Este es para que cuando la app se cargue, cuente los productos en el carrito: (lesson 126)
      setTotalProductsCart(countProductsCart());
      setReloadCart(false);
   }, [auth, reloadCart]);

   const login = (token) => {
      // guardamos el Token en el localstorage: (lesson 58)
      setToken(token);

      // Para guardar los datos del login en el Context (Lesson 58)
      setAuth({
         token,
         idUser: jwtDecode(token).id,
      });
   };

   const logout = () => {
      // función para salir de la sesión (lesson 61)
      if (auth) {
         removeToken();
         setAuth(null);
         router.push("/");
      }
   };

   // Función para agregar productos al carrito, primero verificamos que esté loggueado: (lesson 125 )
   const addProduct = (product) => {
      const token = getToken();

      if (token) {
         addProductCart(product);
         setReloadCart(true);
      } else {
         toast.warning("Debes iniciar sesión para agregar productos al carrito");
      }
   };

   // Función para remover item del carrito (lesson 131)
   const removeProduct = (product) => {
      const token = getToken();

      if (token) {
         removeProductCart(product);
         setReloadCart(true);
      } else {
         toast.warning("Debes iniciar sesión para agregar productos al carrito");
      }
   };

   const authData = useMemo(
      // Sirve para memorizar los datos (lesson 57)
      () => ({
         // esto se puede simplificar porque tiene el mismo nombre:
         auth: auth,
         login: login,
         logout: logout,
         setReloadUser: setReloadUser,
      }),
      [auth]
   );

   const cartData = useMemo(
      // aqui vamos a usar la info del cart: (lesson 123)
      () => ({
         productsCart: totalProductsCart,
         addProductCart: (product) => addProduct(product),
         removeProductCart: (product) => removeProduct(product),
         getProductsCart: getProductsCart,
         removeAllProductsCart,
      }),
      [totalProductsCart]
   );

   if (auth === undefined) return null;

   return (
      // context para authentication:
      <AuthContext.Provider value={authData}>
         {/* context para el carrito de compras: (lesson 123) */}
         <CartContext.Provider value={cartData}>
            {/* Toda la app: */}
            <Component {...pageProps} />
            <ToastContainer
               // Lesson 53: usamos esto para notificaciones
               position="top-right"
               autoClose={5000}
               hideProgressBar
               newestOnTop
               closeOnClick
               rtl={false}
               pauseOnFocusLoss={false}
               draggable
               pauseOnHover
            />
         </CartContext.Provider>
      </AuthContext.Provider>
   );
}

export default MyApp;
