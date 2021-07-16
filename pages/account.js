import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// --- HOOKS ---
import useAuth from "../hooks/useAuth";

// --- API ---
import { getMeApi } from "../api/user";

// --- COMPONENTS ---
import { Icon } from "semantic-ui-react";
import BasicLayout from "../layouts/BasicLayout";
import ChangeNameForm from "../components/Account/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm";
import ChangePasswordForm from "../components/Account/ChangePasswordForm";
import BasicModal from "../components/Modal/BasicModal";
import AddressForm from "../components/Account/AddressForm";
import ListAddress from "../components/Account/ListAddress";
import Seo from "../components/Seo";

export default function Account() {
   const [user, setUser] = useState(undefined);

   // de aqui sacamos la info del context:
   const { auth, logout, setReloadUser } = useAuth();
   const router = useRouter();

   useEffect(() => {
      // creamos una funcion que se autollame para que pueda ser asyncrona: (lesson 66)
      (async () => {
         const response = await getMeApi(logout);
         setUser(response || null);
      })();
   }, [auth]);

   // mientras no haya user, no renderizamos nada
   if (user === undefined) return null;

   // si el usuario no está loggueado, lo mandamos a home: (lesson 66)
   if (!auth && !user) {
      router.replace("/");
      return null;
   } else {
      return (
         <BasicLayout>
            <Seo title="Mi cuenta" />
            <Configuration user={user} logout={logout} setReloadUser={setReloadUser} />
            <Addresses />
         </BasicLayout>
      );
   }
}

function Configuration({ user, logout, setReloadUser }) {
   return (
      <div className="account__configuration">
         <div className="title">Configuración</div>
         <div className="data">
            <ChangeNameForm user={user} logout={logout} setReloadUser={setReloadUser} />
            <ChangeEmailForm user={user} logout={logout} setReloadUser={setReloadUser} />
            <ChangePasswordForm
               user={user}
               logout={logout}
               // no se pasa el setReloadUser porque no hay nada que actualizar en la pantalla
            />
         </div>
      </div>
   );
}

function Addresses() {
   const [showModal, setShowModal] = useState(false);
   const [titleModal, setTitleModal] = useState("");
   const [formModal, setFormModal] = useState(null);
   const [reloadAddreses, setReloadAddreses] = useState(false);

   const openModal = (title, address) => {
      setTitleModal(title);
      setFormModal(
         <AddressForm
            setShowModal={setShowModal}
            setReloadAddreses={setReloadAddreses}
            // Para que se muestre si tiene o no contenido: (lesson 87)
            newAddress={address ? false : true}
            address={address || null}
         />
      );
      setShowModal(true);
   };

   return (
      <div className="account__addresses">
         <div className="title">
            Direcciones
            <Icon name="plus" link onClick={() => openModal("Agregar Nueva Dirección:")} />
         </div>
         <div className="data">
            <ListAddress
               reloadAddreses={reloadAddreses}
               setReloadAddreses={setReloadAddreses}
               // openModal es para que pueda editar la dirección: (lesson 87)
               openModal={openModal}
            />
         </div>
         <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
            {formModal}
         </BasicModal>
      </div>
   );
}
