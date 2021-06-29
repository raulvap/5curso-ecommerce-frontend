import { BASE_PATH } from "../utils/constants";

// Hacemos el Api para las conexiones para el menú de plataformas (lesson 90)
export async function getPlatformsApi() {
   try {
      // para ordenarlo, mandamos en la url la indicacion:
      const url = `${BASE_PATH}/platforms?_sort=position:asc`;
      const response = await fetch(url);
      const result = await response.json();
      return result;
   } catch (error) {
      console.log(error);
      return null;
   }
}
