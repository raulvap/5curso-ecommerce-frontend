// Creamos un Hook de Authentication: (lesson 57)

import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default () => useContext(AuthContext);

// esto nos da el state en toda la app.
// ********** EL STATE ESTÁ DEFINIDO EN /context/AuthContext.js:
