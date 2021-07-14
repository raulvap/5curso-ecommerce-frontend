// Creamos un Hook para el Carrito de Compras: (lesson 123)
// esto sirve para que podamos usar desde cualquier componente, la info que tengamos en el context:

import { useContext } from "react";
import CartContext from "../context/CartContext";

const HookCartContext = () => useContext(CartContext);

// esto nos da el state en toda la app.
// ********** EL STATE ESTÁ DEFINIDO EN /context/CartContext.js ****************
export default HookCartContext;

// siguiente paso, es envolver a toda la _app.js en el contexto que creamos
