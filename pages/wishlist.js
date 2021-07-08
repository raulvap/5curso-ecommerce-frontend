import React, { useState, useEffect } from "react";
import { size, forEach } from "lodash";
import { getFavoriteApi } from "../api/favorite";
import useAuth from "../hooks/useAuth";
import { Loader } from "semantic-ui-react";
import BasicLayout from "../layouts/BasicLayout";
import ListGames from "../components/ListGames";

export default function wishlist() {
   const [games, setGames] = useState(null);
   const { auth, logout } = useAuth();

   useEffect(() => {
      // función anónima que se autollame: (lesson 117)
      (async () => {
         const response = await getFavoriteApi(auth.idUser, logout);
         if (size(response) > 0) {
            const gamesList = [];
            forEach(response, (data) => {
               gamesList.push(data.game);
            });
            setGames(gamesList);
         } else {
            setGames([]);
         }
      })();
   }, []);

   return (
      <BasicLayout className="wishlist">
         <div className="wishlist__block">
            <div className="title">Favoritos</div>
            <div className="data">
               {!games ? <Loader active>Cargando información...</Loader> : null}
               {games && size(games) === 0 && (
                  <div>
                     <h3> No hay favoritos</h3>
                  </div>
               )}
               {size(games) > 0 && <ListGames games={games} />}
            </div>
         </div>
      </BasicLayout>
   );
}
