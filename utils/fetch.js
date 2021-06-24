import { getToken, hasExpiredToken } from "../api/token";

export async function authFetch(url, params, logout) {
   // Para hacer peticiones al servidor autentificadas: (lesson 62)
   const token = getToken();

   if (!token) {
      // Usuario no loggueado
      logout();
   } else {
      // comprobar que el token es válido:
      if (hasExpiredToken(token)) {
         // si la función regresa true, entonces ha expirado:
         logout();
      } else {
         // si la función regresa false, entonces el token es válido y hacemos los parámetros autentificados
         const paramsTemp = {
            ...params,
            headers: {
               ...params?.headers,
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
