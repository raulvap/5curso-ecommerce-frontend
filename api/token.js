import { TOKEN } from "../utils/constants";

// Para guardar los datos del login del usuario en el storage (lesson 58)
export function setToken(token) {
   localStorage.setItem(TOKEN, token);
}

// Para obtener los datos del local storage (lesson 59)
export function getToken() {
   return localStorage.getItem(TOKEN);
}
