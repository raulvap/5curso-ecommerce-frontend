import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

// Register Form
export async function registerApi(formData) {
   try {
      const url = `${BASE_PATH}/auth/local/register`;
      const params = {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(formData),
      };

      // hacemos el fetch:
      const response = await fetch(url, params);
      const result = await response.json();
      //mandamos el resultado (a register.form)
      return result;
   } catch (error) {
      console.log(error);
      return null;
   }
}

// Login (lesson 56)
export async function loginApi(formData) {
   try {
      const url = `${BASE_PATH}/auth/local`;

      const params = {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(formData),
      };
      const response = await fetch(url, params);
      const result = response.json();
      return result;
   } catch (error) {
      console.log(error);
      return null;
   }
}

// ResetPassword (lesson 60)
export async function resetPasswordApi(email) {
   try {
      const url = `${BASE_PATH}/auth/forgot-password`;
      const params = {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ email: email }),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
   } catch (error) {
      console.log(error);
      return null;
   }
}

// Obtener info del Usuario (lesson 63)
export async function getMeApi(logout) {
   try {
      const url = `${BASE_PATH}/users/me`;
      // usamos el fetch autentificado que creamos:
      const result = await authFetch(url, null, logout);
      return result ? result : null;
   } catch (error) {
      console.log(error);
      return null;
   }
}
