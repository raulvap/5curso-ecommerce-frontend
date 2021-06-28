import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

// Para crear direcciones: (lesson 82)
export async function createAddressApi(address, logout) {
   try {
      const url = `${BASE_PATH}/addresses`;
      const params = {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(address),
      };
      const result = await authFetch(url, params, logout);
      return result;
   } catch (error) {
      console.log(error);
      return null;
   }
}

// Para obtener las direcciones (lesson 83)
export async function getAddressApi(idUser, logout) {
   try {
      // para que el usuario pueda ver solo las direcciones que le
      const url = `${BASE_PATH}/addresses?users_permissions_user=${idUser}`;
      const result = await authFetch(url, null, logout);

      if (result.statusCode === 500) throw "ERROR";
      return result ? result : null;
   } catch (e) {
      console.log(e);
      return null;
   }
}

// Para eliminar direcciones (lesson 86)
export async function deleteAddressApi(idAddress, logout) {
   try {
      const url = `${BASE_PATH}/addresses/${idAddress}`;
      const params = {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
         },
      };
      const result = await authFetch(url, params, logout);
      if (result.statusCode === 500) throw "Error del servidor";
      return true;
   } catch (error) {
      console.log(error);
      return false;
   }
}

// Para actualizar info (lesson 88)
export async function updateAddressApi(idAddress, address, logout) {
   try {
      const url = `${BASE_PATH}/addresses/${idAddress}`;
      const params = {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(address),
      };
      const result = await authFetch(url, params, logout);
      return result;
   } catch (error) {
      console.log(error);
      return null;
   }
}
