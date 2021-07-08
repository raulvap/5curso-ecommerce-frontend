import { BASE_PATH } from "../utils/constants";

export async function getLastGamesApi(limit) {
   // Obtenemos los últimos juegos añadidos a la base de datos: (lesson 93)
   try {
      // para un número limitado de items:
      const limitItems = `_limit=${limit}`;
      // para ordenar por fecha de creación:
      const sortItem = "_sort=createdAt:desc";
      // creamos la url:
      const url = `${BASE_PATH}/games?${limitItems}&${sortItem}`;
      // hacemos fetch. Es un api abierta
      const response = await fetch(url);
      const result = await response.json();
      return result;
   } catch (error) {
      console.log(error);
      return null;
   }
}

export async function getGamesPlatformApi(platform, limit, start) {
   // Obtenemos los juegos por plataforma (Lesson 98)
   try {
      // cuantos juegos por página:
      const limitItems = `_limit=${limit}`;
      // que vengan ordenados:
      const sortItems = `_sort=createdAt:desc`;
      // para la paginación:
      const startItems = `_start=${start}`;
      const url = `${BASE_PATH}/games?platform.url=${platform}&${limitItems}&${sortItems}&${startItems}`;
      const response = await fetch(url);
      const result = await response.json();
      return result;
   } catch (error) {
      console.log(error);
      return null;
   }
}

export async function getTotalGamesPlatformApi(platform) {
   // Para obtener el total de juegos en la plataforma, esto para la páginación (lesson 100)
   try {
      const url = `${BASE_PATH}/games/count?platform.url=${platform}`;
      const response = await fetch(url);
      const result = await response.json();
      return result;
   } catch (error) {
      console.log(error);
      return null;
   }
}

export async function getGameByUrlApi(path) {
   // Obtener información del juego: (lesson 104)
   try {
      const url = `${BASE_PATH}/games?url=${path}`;
      const response = await fetch(url);
      const result = await response.json();
      return result[0];
   } catch (error) {
      console.log(error);
      return null;
   }
}

export async function searchGamesApi(title) {
   // Para obtener un juego basado en la búsqueda: (lesson 121)
   try {
      const url = `${BASE_PATH}/games?_q=${title}`;
      const response = await fetch(url);
      const result = await response.json();
      return result;
   } catch (error) {
      console.log(error);
      return null;
   }
}
