import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../../hooks/useAuth";
import { createAddressApi, updateAddressApi } from "../../../api/address";
import { Form, Button } from "semantic-ui-react";
import { toast } from "react-toastify";

export default function AddressForm(props) {
   const { setShowModal, setReloadAddreses, newAddress, address } = props;
   const [loading, setLoading] = useState(false);
   // para obtener los datos del usuario: (lesson 82)
   const { auth, logout } = useAuth();

   const formik = useFormik({
      initialValues: initialValues(address),
      validationSchema: Yup.object(validationSchema()),
      onSubmit: (formData) => {
         newAddress ? createAddress(formData) : updateAddress(formData);
      },
   });

   const createAddress = async (formData) => {
      // Creando una nueva dirección (lesson 82)
      setLoading(true);
      const formDataTemp = {
         ...formData,
         users_permissions_user: auth.idUser,
      };
      const response = await createAddressApi(formDataTemp, logout);

      if (!response) {
         toast.warning("Error al crear la nueva dirección");
         setLoading(false);
      } else {
         toast.success("Dirección creada");
         formik.resetForm();
         setReloadAddreses(true);
         setLoading(false);
         setShowModal(false);
      }
   };

   const updateAddress = async (formData) => {
      // Para actualizar info (lesson 87,88)
      setLoading(true);
      const formDataTemp = {
         ...formData,
         users_permissions_use: auth.idUser,
      };
      const response = await updateAddressApi(address._id, formDataTemp, logout);

      if (!response) {
         toast.warning("Error al actualizar la direccion");
         setLoading(false);
      } else {
         toast.success("Dirección actualizada");
         formik.resetForm();
         setReloadAddreses(true);
         setLoading(false);
         setShowModal(false);
      }
   };

   return (
      <Form onSubmit={formik.handleSubmit}>
         <Form.Input
            name="title"
            type="text"
            label="Titulo de la dirección"
            placeholder="Titulo de la dirección"
            onChange={formik.handleChange}
            value={formik.values.title}
            error={formik.errors.title}
         />

         <Form.Group widths="equal">
            <Form.Input
               name="name"
               type="text"
               label="Nombre y apeliidos"
               placeholder="Nombre y apellidos"
               onChange={formik.handleChange}
               value={formik.values.name}
               error={formik.errors.name}
            />
            <Form.Input
               name="address"
               type="text"
               label="Dirección"
               placeholder="Dirección"
               onChange={formik.handleChange}
               value={formik.values.address}
               error={formik.errors.address}
            />
         </Form.Group>
         <Form.Group widths="equal">
            <Form.Input
               name="city"
               type="text"
               label="Ciudad"
               placeholder="Ciudad"
               onChange={formik.handleChange}
               value={formik.values.city}
               error={formik.errors.city}
            />
            <Form.Input
               name="state"
               type="text"
               label="Estado/Provincia/Región"
               placeholder="Estado/Provincia/Región"
               onChange={formik.handleChange}
               value={formik.values.state}
               error={formik.errors.state}
            />
         </Form.Group>
         <Form.Group widths="equal">
            <Form.Input
               name="postalCode"
               type="text"
               label="Código postal"
               placeholder="Código postal"
               onChange={formik.handleChange}
               value={formik.values.postalCode}
               error={formik.errors.postalCode}
            />
            <Form.Input
               name="phone"
               type="text"
               label="Número de teléfono"
               placeholder="Número de teléfono"
               onChange={formik.handleChange}
               value={formik.values.phone}
               error={formik.errors.phone}
            />
         </Form.Group>
         <div className="actions">
            <Button className="submit" type="submit" loading={loading}>
               {newAddress ? "Crear dirección" : "Actualizar dirección"}
            </Button>
         </div>
      </Form>
   );
}

function initialValues(address) {
   // si el usuario quiere actualizar una dirección, que ponga la info de la dirección: (lesson 87)
   return {
      title: address?.title || "",
      name: address?.name || "",
      address: address?.address || "",
      city: address?.city || "",
      state: address?.state || "",
      postalCode: address?.postalCode || "",
      phone: address?.phone || "",
   };
}

function validationSchema() {
   return {
      title: Yup.string().required(true),
      name: Yup.string().required(true),
      address: Yup.string().required(true),
      city: Yup.string().required(true),
      state: Yup.string().required(true),
      postalCode: Yup.string().required(true),
      phone: Yup.string().required(true),
   };
}
