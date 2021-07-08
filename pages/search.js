import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { size } from "lodash";
import { searchGamesApi } from "../api/game";
import BasicLayout from "../layouts/BasicLayout";
import ListGames from "../components/ListGames";
// import Seo from "../components/Seo";

export default function search() {
   const [games, setGames] = useState(null);
   // para saber el valor de la URL:
   const { query } = useRouter();

   // Esto es para que cuando se cargue la página, se siga escribiendo en el buscador (lesson 120)
   useEffect(() => {
      document.getElementById("search-game").focus();
   }, []);

   // Para actualizar la info:
   useEffect(() => {
      (async () => {
         if (size(query.query) > 1) {
            // si el usuario escribe más de 2 caracteres entonces:
            const response = await searchGamesApi(query.query);
            if (size(response) > 0) setGames(response);
            else setGames([]);
         } else {
            setGames([]);
         }
      })();
   }, [query]);

   return (
      <BasicLayout className="search">
         {/* <Seo title={`Buscando: ${query.query}`} /> */}
         {!games && <Loader active>Buscando juegos...</Loader>}
         {games && size(games) === 0 && (
            <div>
               <h3>No se han encontrado juegos</h3>
            </div>
         )}
         {size(games) > 0 && <ListGames games={games} />}
      </BasicLayout>
   );
}
