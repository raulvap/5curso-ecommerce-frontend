import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// --- HOOKS ---
import useAuth from "../hooks/useAuth";

// --- API ---
import { getMeApi } from "../api/user";

// --- COMPONENTS ---
import BasicLayout from "../layouts/BasicLayout";
import ChangeNameForm from "../components/Account/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm";
import ChangePasswordForm from "../components/Account/ChangePasswordForm";

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
            <Configuration user={user} logout={logout} setReloadUser={setReloadUser} />
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
