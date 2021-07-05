import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { size } from "lodash";

// --- API ---
import { getGamesPlatformApi, getTotalGamesPlatformApi } from "../../api/game";

// --- COMPONENTS ---
import { Loader } from "semantic-ui-react";
import BasicLayout from "../../layouts/BasicLayout";
import ListGames from "../../components/ListGames";
import Pagination from "../../components/Pagination";

const limitPerPage = 10;

export default function Platform() {
   const router = useRouter();
   const { query } = useRouter();

   // --- STATE ---
   const [games, setGames] = useState(null);
   const [totalGames, setTotalGames] = useState(null);

   // Para la paginación: (lesson 100 y 101)
   const getStartItem = () => {
      const currentPage = parseInt(query.page);
      if (!query.page || currentPage === 1) return 0;
      else return currentPage * limitPerPage - limitPerPage;
   };

   // --- Effect ---
   useEffect(() => {
      // para cuando se define query: (lesson 99)
      if (query.platform) {
         // creamos una función async que se autollame: (lesson 98)
         (async () => {
            const response = await getGamesPlatformApi(
               query.platform,
               limitPerPage,
               getStartItem()
            );
            setGames(response);
         })();
      }
   }, [query]);

   useEffect(() => {
      // para cada función, creamos un useEffect (lesson 100)
      (async () => {
         const response = await getTotalGamesPlatformApi(query.platform);
         setTotalGames(response);
      })();
   }, [query]);

   return (
      <BasicLayout className="platform">
         {!games ? <Loader active>Cargando información...</Loader> : null}
         {games && size(games) === 0 && (
            <div>
               <h3> No hay juegos disponibles</h3>
            </div>
         )}
         {size(games) > 0 && <ListGames games={games} />}

         {totalGames ? (
            <Pagination
               totalGames={totalGames}
               page={query.page ? parseInt(query.page) : 1}
               limitPerPage={limitPerPage}
            />
         ) : null}
      </BasicLayout>
   );
}
