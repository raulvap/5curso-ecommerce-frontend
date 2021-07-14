import React, { useState, useEffect } from "react";
import { size } from "lodash";
import { isFavoriteApi, addFavoriteApi, deleteFavoriteApi } from "../../../api/favorite";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import { Grid, Image, Icon, Button } from "semantic-ui-react";
import classNames from "classnames";

export default function HeaderGame({ game }) {
   const { poster } = game;

   return (
      <Grid className="header-game">
         <Grid.Column mobile={16} tablet={6} computer={5}>
            <Image src={poster.url} alt={game.title} fluid />
         </Grid.Column>
         <Grid.Column mobile={16} tablet={10} computer={11}>
            <InfoGame game={game} />
         </Grid.Column>
      </Grid>
   );
}

function InfoGame({ game }) {
   const { title, summary, price, discount, url } = game;
   const [isFavorite, setIsFavorite] = useState(false);
   const [reloadFavorite, setReloadFavorite] = useState(false);
   const { auth, logout } = useAuth();
   const { addProductCart } = useCart();

   useEffect(() => {
      // función async autoejecutable:
      if (auth) {
         (async () => {
            // función api para obtner info de la base de datos (lesson 113)
            const response = await isFavoriteApi(auth.idUser, game.id, logout);
            if (size(response) > 0) setIsFavorite(true);
            else setIsFavorite(false);
         })();
         setReloadFavorite(false);
      } else {
         setIsFavorite(false);
         setReloadFavorite(false);
         return null;
      }
   }, [game, reloadFavorite]);

   const addFavorite = async () => {
      if (auth) {
         await addFavoriteApi(auth.idUser, game.id, logout);
         setReloadFavorite(true);
      }
   };

   const deleteFavorite = async () => {
      if (auth) {
         await deleteFavoriteApi(auth.idUser, game.id, logout);
         setReloadFavorite(true);
      }
   };

   return (
      <>
         <div className="header-game__title">
            {title}
            <Icon
               name={isFavorite ? "heart" : "heart outline"}
               className={
                  // usames classNames para darle estilo: (lesson 113, min 10)
                  // cuando isFavorite sea true, le pone la clase de like
                  classNames({
                     like: isFavorite,
                  })
               }
               link
               onClick={isFavorite ? deleteFavorite : addFavorite}
            />
         </div>
         <div className="header-game__delivery">Entrega en 24/48h</div>
         <div className="header-game__summary" dangerouslySetInnerHTML={{ __html: summary }} />
         <div className="header-game__buy">
            <div className="header-game__buy-price">
               <p>Precio de venta al publico: ${price}</p>
               <div className="header-game__buy-price-actions">
                  <p>-{discount}%</p>
                  <p>
                     $
                     {
                        // para calcular el precio con descuento, redondeado a 2 decimales
                        (price - Math.floor(price * discount) / 100).toFixed(2)
                     }
                  </p>
               </div>
            </div>
            <Button
               className="header-game__buy-btn"
               onClick={
                  // Pasamos la url al context de useCart (lesson 125)
                  () => addProductCart(url)
               }
            >
               Comprar
            </Button>
         </div>
      </>
   );
}
