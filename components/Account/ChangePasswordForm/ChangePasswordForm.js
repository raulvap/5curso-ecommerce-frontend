import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updatePasswordApi } from "../../../api/user";

export default function ChangePasswordForm(props) {
   const { user, logout } = props;
   const [loading, setLoading] = useState(false);

   const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: Yup.object(validationSchema()),

      // onSubmit enviamos al API la info para que actualice la info:
      onSubmit: async (formData) => {
         setLoading(true);
         const response = await updatePasswordApi(user.id, formData.password, logout);
         if (!response) {
            toast.error("Error al actualizar la contraseña");
         } else {
            toast.success("Contraseña actualizada. Debes volver a iniciar sesión");
            logout();
         }
         setLoading(false);
      },
   });

   return (
      <div className="change-password-form">
         <h4>Cambiar contraseña</h4>
         <Form onSubmit={formik.handleSubmit}>
            <Form.Group widths="equal">
               <Form.Input
                  name="password"
                  type="password"
                  placeholder="Nueva contraseña"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  error={formik.errors.password}
               />
               <Form.Input
                  name="repeatPassword"
                  type="password"
                  placeholder="Confirmar contraseña"
                  onChange={formik.handleChange}
                  value={formik.values.repeatPassword}
                  error={formik.errors.repeatPassword}
               />
            </Form.Group>
            <Button type="submit" className="submit" loading={loading}>
               Actualizar Contraseña
            </Button>
         </Form>
      </div>
   );
}

function initialValues() {
   return {
      password: "",
      repeatPassword: "",
   };
}

function validationSchema() {
   return {
      password: Yup.string()
         .required(true)
         // para que la contraseña sea igual a repeatPassword:
         .oneOf([Yup.ref("repeatPassword")], true),
      repeatPassword: Yup.string()
         .required(true)
         // para que la contraseña sea igual a Password:
         .oneOf([Yup.ref("password")], true),
   };
}
