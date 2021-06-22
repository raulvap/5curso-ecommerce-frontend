import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

// --- API ---
import { registerApi } from "../../../api/user";

export default function LoginForm({ showLoginForm }) {
   const [loading, setloading] = useState(loading);

   const formik = useFormik({
      // usando formik para validar formularios con los valores iniciales (lesson 51):
      initialValues: {
         name: "",
         lastname: "",
         username: "",
         email: "",
         password: "",
         repeatPassword: "",
      },
      validationSchema: Yup.object(validationSchema()),

      onSubmit: async (formData) => {
         // Enviamos la info a la API que conecta con el servidor: (lesson 52)
         setloading(true);
         const response = await registerApi(formData);
         if (response?.jwt) {
            // Si llega un objeto jwt, va a comprobarlo: (lesson 53)
            toast.success("Usuario creado correctamente. Ya puedes iniciar sesión");
            showLoginForm();
         } else {
            toast.error("Error al registrar el usuario");
         }
         setloading(false);
      },
   });

   return (
      <Form className="login-form" onSubmit={formik.handleSubmit}>
         <Form.Input
            name="name"
            type="text"
            placeholder="Nombre"
            onChange={formik.handleChange}
            error={formik.errors.name}
         />
         <Form.Input
            name="lastname"
            type="text"
            placeholder="Apellidos"
            onChange={formik.handleChange}
            error={formik.errors.lastname}
         />
         <Form.Input
            name="username"
            type="text"
            placeholder="Nombre de usuario"
            onChange={formik.handleChange}
            error={formik.errors.username}
         />
         <Form.Input
            name="email"
            type="text"
            placeholder="Correo electrónico"
            onChange={formik.handleChange}
            error={formik.errors.email}
         />
         <Form.Input
            name="password"
            type="text"
            placeholder="Contraseña"
            onChange={formik.handleChange}
            error={formik.errors.password}
         />
         <Form.Input
            name="repeatPassword"
            type="text"
            placeholder="Repetir contraseña"
            onChange={formik.handleChange}
            error={formik.errors.repeatPassword}
         />
         <div className="actions">
            <Button type="submit" className="submit" loading={loading}>
               Crear Cuenta
            </Button>
            <Button type="button" basic onClick={showLoginForm}>
               Ya tengo Cuenta
            </Button>
         </div>
      </Form>
   );
}

// Hacemos una función para validar el schema (lesson 51)
function validationSchema() {
   return {
      name: Yup.string().required(true),
      lastname: Yup.string().required(true),
      username: Yup.string().required(true),
      email: Yup.string().email().required(true),
      password: Yup.string().required(true),
      repeatPassword: Yup.string().required(true),
   };
}
