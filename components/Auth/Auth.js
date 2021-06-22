import React, { useState } from "react";

// --- COMPONENTS ---
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Auth({ onCloseModal, setTitleModal }) {
   const [showLogin, setShowLogin] = useState(true);

   const showLoginForm = () => {
      setShowLogin(true);
      setTitleModal("Iniciar Sesión");
   };

   const showRegisterForm = () => {
      setShowLogin(false);
      setTitleModal("Crear Nuevo Usuario");
   };

   return showLogin ? (
      <LoginForm showRegisterForm={showRegisterForm} onCloseModal={onCloseModal} />
   ) : (
      <RegisterForm showLoginForm={showLoginForm} />
   );
}
