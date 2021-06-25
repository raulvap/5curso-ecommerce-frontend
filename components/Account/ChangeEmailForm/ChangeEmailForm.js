import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateEmailApi } from "../../../api/user";

export default function ChangeEmailForm(props) {
   const { user, logout, setReloadUser } = props;
   const [loading, setLoading] = useState(false);

   const formik = useFormik({
      // Usar formik para el formulario: (Lesson 72)
      initialValues: initialValues(),
      validationSchema: Yup.object(validationSchema()),
      onSubmit: async (formData) => {
         setLoading(true);

         // Enviando información al servidor: (lesson 73)
         const response = await updateEmailApi(user.id, formData.email, logout);
         if (!response || response?.statusCode === 400) {
            toast.error("Error al actualizar el email");
         } else {
            setReloadUser(true);
            toast.success("Email actualizado");
            // reseteamos el formulario:
            formik.handleReset();
         }
         setLoading(false);
      },
   });

   return (
      <div className="change-email-form">
         <h4>
            Cambiar correo clectrónico <span>({user.email})</span>
         </h4>

         <Form onSubmit={formik.handleSubmit}>
            <Form.Group widths="equal">
               <Form.Input
                  name="email"
                  placeholder="Nuevo correo electrónico"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  error={formik.errors.email}
               />
               <Form.Input
                  name="repeatEmail"
                  placeholder="Confirmar correo electrónico"
                  onChange={formik.handleChange}
                  value={formik.values.repeatEmail}
                  error={formik.errors.repeatEmail}
               />
            </Form.Group>
            <Button type="submit" className="submit" loading={loading}>
               Actualizar Email
            </Button>
         </Form>
      </div>
   );
}

function initialValues() {
   return {
      email: "",
      repeatEmail: "",
   };
}

function validationSchema() {
   return {
      email: Yup.string()
         .email(true)
         .required(true)
         // para que este campo sea igual a repeatEmail: (lesson 72)
         .oneOf([Yup.ref("repeatEmail")], true),
      repeatEmail: Yup.string()
         .email(true)
         .required(true)
         // para que este campo sea igual a Email: (lesson 72)
         .oneOf([Yup.ref("email")], true),
   };
}
