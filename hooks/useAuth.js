// Creamos un Hook de Authentication: (lesson 57)

import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const HookContextAuth = () => useContext(AuthContext);

// esto nos da el state en toda la app.
// ********** EL STATE ESTÁ DEFINIDO EN /context/AuthContext.js ****************
export default HookContextAuth;
