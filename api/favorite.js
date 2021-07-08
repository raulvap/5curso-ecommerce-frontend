import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";
import { size } from "lodash";

// Para saber si es favorito el juego que estamos viendo (lesson 113)
export async function isFavoriteApi(idUser, idGame, logout) {
   try {
      const url = `${BASE_PATH}/favorites?users_permissions_user=${idUser}&game=${idGame}`;
      return await authFetch(url, null, logout);
   } catch (error) {
      console.log(error);
      return null;
   }
}

// Para agregar juego a favoritos: (lesson 114)
export async function addFavoriteApi(idUser, idGame, logout) {
   try {
      // 1. Validamos si el juego ya es favorito:
      const dataFound = await isFavoriteApi(idUser, idGame, logout);
      if (size(dataFound) > 0 || !dataFound) {
         return "Este juego ya lo tienes en tu lista de favoritos";
      } else {
         //   2. Si no, entonces creamos el favorito:
         const url = `${BASE_PATH}/favorites`;
         const params = {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               users_permissions_user: idUser,
               game: idGame,
            }),
         };
         const result = await authFetch(url, params, logout);
         return result;
      }
   } catch (error) {
      console.log(error);
      return null;
   }
}

// Para quitar de favoritos: (lesson 115)
export async function deleteFavoriteApi(idUser, idGame, logout) {
   try {
      // Comprobamos si el juego es favorito:
      const dataFound = await isFavoriteApi(idUser, idGame, logout);
      if (size(dataFound) > 0) {
         // necesitamos el id del documento de favorito a eliminar
         const url = `${BASE_PATH}/favorites/${dataFound[0]?._id}`;
         const params = {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
            },
         };
         const result = authFetch(url, params, logout);
         return result;
      }
   } catch (error) {
      console.log(error);
      return null;
   }
}

// Para obtener todos los favoritos: (lesson 117)
export async function getFavoriteApi(idUser, logout) {
   try {
      const url = `${BASE_PATH}/favorites?users_permissions_user=${idUser}`;
      const result = await authFetch(url, null, logout);
      return result;
   } catch (error) {
      console.log(error);
      return null;
   }
}
