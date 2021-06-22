// Vamos a crear un context para tener el state de la app en toda la aplición
// (Lesson 57)

import { createContext } from "react";

const AuthContext = createContext({
   auth: undefined,
   login: () => null,
   logout: () => null,
   setReloadUser: () => null,
});

export default AuthContext;
// ahora importamos en el archivo principal: _app.js
