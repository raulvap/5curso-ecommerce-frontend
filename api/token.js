import { TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";

// Para guardar los datos del login del usuario en el storage (lesson 58)
export function setToken(token) {
   localStorage.setItem(TOKEN, token);
}

// Para obtener los datos del local storage (lesson 59)
export function getToken() {
   return localStorage.getItem(TOKEN);
}

// Para eliminar el token del local storage (lesson 61)
export function removeToken() {
   localStorage.removeItem(TOKEN);
}

// Para validar que el token no ha expirado (lesson 62)
export function hasExpiredToken(token) {
   const tokenDecode = jwtDecode(token);

   const expireDate = tokenDecode.exp * 1000;
   const currentDate = new Date().getTime();

   // validadomos que no haya expirado el token:
   if (currentDate > expireDate) {
      return true;
   }
   return false;
}
