import React, { useState, useEffect } from "react";

// --- API ---
import { getGameByUrlApi } from "../api/game";

// --- HOOKS ---
import useCart from "../hooks/useCart";

// --- COMPONENTS ---
import BasicLayout from "../layouts/BasicLayout";
import SummaryCart from "../components/Cart/SummaryCart";
import AddressShipping from "../components/Cart/AddressShipping";

export default function cart() {
   const { getProductsCart } = useCart();
   // Obtenemos todos los productos:
   const products = getProductsCart();

   return !products ? <EmptyCart /> : <FullCart products={products} />;
}

function EmptyCart() {
   return (
      <BasicLayout className="empty-cart">
         <h2>No hay productos en el carrito</h2>
      </BasicLayout>
   );
}

function FullCart({ products }) {
   const [productsData, setProductsData] = useState(null);
   const [reloadCart, setReloadCart] = useState(false);
   const [address, setAddress] = useState(null);

   useEffect(() => {
      // Hacemos función autoejectutable async: (Lesson 128)
      (async () => {
         const productsTemp = [];
         // hacemos un for async:
         for await (const item of products) {
            // para cada item del carrito, va a llamar al server para obtener la info:
            const data = await getGameByUrlApi(item);
            // guardamos esa info en el array temp:
            productsTemp.push(data);
         }
         // guardamos toda la info en el state:
         setProductsData(productsTemp);
      })();
      setReloadCart(false);
   }, [reloadCart]);

   return (
      <BasicLayout className="empty-cart">
         <SummaryCart
            products={productsData}
            reloadCart={reloadCart}
            setReloadCart={setReloadCart}
         />
         <AddressShipping setAddress={setAddress} />
      </BasicLayout>
   );
}
