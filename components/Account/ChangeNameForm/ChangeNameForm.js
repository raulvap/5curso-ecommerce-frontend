import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "semantic-ui-react";
import { toast } from "react-toastify";

// --- API ---
import { updateNameApi } from "../../../api/user";

export default function ChangeNameForm(props) {
   const { user, logout, setReloadUser } = props;
   const [loading, setLoading] = useState(false);

   const formik = useFormik({
      // Usamos formik para manejar los datos del formulario: (lesson 68)
      initialValues: initialValues(user.name, user.lastname),
      validationSchema: Yup.object(validationSchema()),
      onSubmit: async (formData) => {
         setLoading(true);
         const response = await updateNameApi(user.id, formData, logout);
         if (!response) {
            toast.error("Error al actualizar la información");
         } else {
            setReloadUser(true);
            toast.success("Información actualizada");
         }
         setLoading(false);
      },
   });

   return (
      <div className="change-name-form">
         <h4>Cambiar nombre y apellidos</h4>
         <Form onSubmit={formik.handleSubmit}>
            <Form.Group widths="equal">
               <Form.Input
                  name="name"
                  placeholder="Nombre"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  error={formik.errors.name}
               />
               <Form.Input
                  name="lastname"
                  placeholder="Apellidos"
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                  error={formik.errors.lastname}
               />
            </Form.Group>
            <Button className="submit" type="submit" loading={loading}>
               Actualizar Información
            </Button>
         </Form>
      </div>
   );
}

function initialValues(name, lastname) {
   // ponemos como inicio, los nombres del usuario que estamos editando (lesson 68)
   return {
      name: name || "",
      lastname: lastname || "",
   };
}

function validationSchema() {
   return {
      name: Yup.string().required(true),
      lastname: Yup.string().required(true),
   };
}
