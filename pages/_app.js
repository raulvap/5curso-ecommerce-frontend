import React, { useState, useEffect, useMemo } from "react";
import { ToastContainer } from "react-toastify";
import AuthContext from "../context/AuthContext";
import jwtDecode from "jwt-decode";
import { setToken, getToken } from "../api/token";

// --- STYLES ---
import "semantic-ui-css/semantic.min.css";
import "../scss/global.scss";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
   const [auth, setAuth] = useState(undefined);
   const [reloadUser, setReloadUser] = useState(false);

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

   const login = (token) => {
      // guardamos el Token en el localstorage: (lesson 58)
      setToken(token);

      // Para guardar los datos del login en el Context (Lesson 58)
      setAuth({
         token,
         idUser: jwtDecode(token).id,
      });
   };

   const authData = useMemo(
      // Sirve para memorizar los datos (lesson 57)
      () => ({
         auth: auth,
         login: login,
         logout: () => null,
         setReloadUser: setReloadUser,
      }),
      [auth]
   );

   if (auth === undefined) return null;

   return (
      <AuthContext.Provider value={authData}>
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
      </AuthContext.Provider>
   );
}

export default MyApp;
