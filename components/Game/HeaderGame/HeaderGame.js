import React, { useState, useEffect } from "react";
import { size } from "lodash";
import { Grid, Image, Icon, Button } from "semantic-ui-react";

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

   return (
      <>
         <div className="header-game__title">
            {title}
            {/* <Icon
        name={isFavorite ? "heart" : "heart outline"}
        className={classNames({
          like: isFavorite,
        })}
        link
        onClick={isFavorite ? deleteFavorite : addFavorite}
      /> */}
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
                        // para calcular el precio con descuento:
                        (price - Math.floor(price * discount) / 100).toFixed(2)
                     }
                  </p>
               </div>
            </div>
            <Button
               className="header-game__buy-btn"
               // onClick={() => addProductCart(url)}
            >
               Comprar
            </Button>
         </div>
      </>
   );
}
