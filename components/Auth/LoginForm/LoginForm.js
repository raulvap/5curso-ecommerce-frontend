import React, { useState } from "react";

// --- CONTEXT Hook ---
import useAuth from "../../../hooks/useAuth";

// --- COMPONENTS ---
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

// --- API ---
import { loginApi, resetPasswordApi } from "../../../api/user";

export default function LoginForm({ showRegisterForm, onCloseModal }) {
   const [loading, setLoading] = useState(false);

   // Para guardar los datos del usuario en el context (lesson 58)
   const { login } = useAuth();

   const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: Yup.object(validationSchema()),
      onSubmit: async (formData) => {
         setLoading(true);
         const response = await loginApi(formData);
         if (response?.jwt) {
            // Si llega un objeto jwt, va a comprobarlo: (lesson 56)

            // Pasamos el token a la función de login del context (lesson 58)
            login(response.jwt);

            onCloseModal();
         } else {
            toast.error("El email o la contraseña son incorrectos");
         }

         setLoading(false);
      },
   });

   const resetPassword = () => {
      // Para recuperar la contraseña: (lesson 60)
      formik.setErrors({});
      const validateEmail = Yup.string().email().required();

      if (!validateEmail.isValidSync(formik.values.identifier)) {
         // si la validación es incorrecta, entonces:
         formik.setErrors({ identifier: true });
      } else {
         resetPasswordApi(formik.values.identifier);
      }
   };

   return (
      <Form className="login-form" onSubmit={formik.handleSubmit}>
         <Form.Input
            name="identifier"
            //el name "identifier" es para STRAPI (lesson 54)
            type="text"
            placeholder="Correo electrónico"
            onChange={formik.handleChange}
            error={formik.errors.identifier}
         />

         <Form.Input
            name="password"
            type="password"
            placeholder="Contraseña"
            onChange={formik.handleChange}
            error={formik.errors.password}
         />

         <div className="actions">
            <div>
               <Button type="submit" className="submit" loading={loading}>
                  Iniciar Sesión
               </Button>
               <Button type="button" onClick={resetPassword}>
                  Olvidé mi contraseña
               </Button>
            </div>
            <Button type="button" basic onClick={showRegisterForm}>
               Crear Cuenta
            </Button>
         </div>
      </Form>
   );
}

function initialValues() {
   return {
      identifier: "",
      password: "",
   };
}

function validationSchema() {
   return {
      identifier: Yup.string().email(true).required(true),
      password: Yup.string().required(true),
   };
}
