import { getToken, hasExpiredToken } from "../api/token";
import { toast } from "react-toastify";

export async function authFetch(url, params, logout) {
   // Para hacer peticiones al servidor autentificadas: (lesson 62)
   const token = getToken();

   if (!token) {
      // Usuario no loggueado
      // toast.error("Debes inciar sesión");
      logout();
   } else {
      // comprobar que el token es válido:
      if (hasExpiredToken(token)) {
         // si la función regresa true, entonces ha expirado:
         toast.error("Tu sesión ha expirado, debes volver a iniciar sesión");
         logout();
      } else {
         // si la función regresa false, entonces el token es válido y hacemos los parámetros autentificados
         const paramsTemp = {
            // ponemos los parámetros que recibimos dependiendo del api:
            ...params,

            headers: {
               // si hay headers, los colocamos:
               ...params?.headers,
               // ponermos la autorización con el token:
               Authorization: `Bearer ${token}`,
            },
         };

         // hacemos el fetch:
         try {
            const response = await fetch(url, paramsTemp);
            const result = response.json();
            return result;
         } catch (error) {
            console.log(error);
            return error;
         }
      }
   }
}
