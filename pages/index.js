import React, { useState, useEffect } from "react";
import { size } from "lodash";

// --- API ---
import { getLastGamesApi } from "../api/game";

// --- COMPONENTS ---
import { Loader } from "semantic-ui-react";
import BasicLayout from "../layouts/BasicLayout";
import ListGames from "../components/ListGames";
import Seo from "../components/Seo";

export default function Home() {
   // ESTA ES LA PÁGINA DE INICIO
   const [games, setGames] = useState(null);

   useEffect(() => {
      // creamos una función async que se autollame para que nos traiga los últimos juegos (lesson 93)
      (async () => {
         const response = await getLastGamesApi(10);
         // comprobamos que al menos haya 1 juego: (size viene de lodash)
         if (size(response) > 0) {
            setGames(response);
         } else {
            setGames([]);
         }
      })();
   }, []);

   return (
      <BasicLayout>
         <div className="home">
            <Seo />

            {!games && <Loader active>Cargando información...</Loader>}
            {games && size(games) === 0 && (
               <div>
                  <h3>No hay juegos cargados</h3>
               </div>
            )}
            {size(games) > 0 && <ListGames games={games} />}
         </div>
      </BasicLayout>
   );
}
