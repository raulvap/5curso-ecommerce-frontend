import React, { useState, useEffect } from "react";
import Link from "next/link";
import { map } from "lodash";

// --- HOOKS ---
import useAuth from "../../../hooks/useAuth";

// --- API ---
import { getMeApi } from "../../../api/user";
import { getPlatformsApi } from "../../../api/platform";

// --- COMPONENTS ---
import { Container, Menu, Grid, Icon } from "semantic-ui-react";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth";

export default function MenuWeb() {
   const [showModal, setShowModal] = useState(false);
   const [titleModal, setTitleModal] = useState("Iniciar Sesión");
   const [user, setUser] = useState(undefined);
   const [platforms, setPlatforms] = useState([]);

   // Sacamos del auth la info: (lesson 61)
   const { auth, logout } = useAuth();

   useEffect(() => {
      // vamos a hacer una función que se autollame para que sea asyncrono: (lesson 63)
      (async () => {
         const response = await getMeApi(logout);
         setUser(response);
      })();
   }, [auth]);

   useEffect(() => {
      // función async que se autollama para el menu de las plataformas: (Lesson 90)
      (async () => {
         const response = await getPlatformsApi();
         setPlatforms(response);
      })();
   }, []);

   const onShowModal = () => setShowModal(true);
   const onCloseModal = () => setShowModal(false);

   return (
      <div className="menu">
         <Container>
            <Grid>
               <Grid.Column className="menu__left" width={6}>
                  <MenuPlatforms platforms={platforms} />
               </Grid.Column>
               <Grid.Column className="menu__right" width={10}>
                  {user !== undefined && (
                     // Si el usuario es diferente a undefined, entonces está loggeado y renderizamos el menu:
                     <MenuOptions onShowModal={onShowModal} user={user} logout={logout} />
                  )}
               </Grid.Column>
            </Grid>
         </Container>

         <BasicModal show={showModal} setShow={setShowModal} title={titleModal} size="small">
            <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
         </BasicModal>
      </div>
   );
}

// Menu web (lesson 42) (*Menu Item as="a" hace que se comporte como un link)
function MenuPlatforms({ platforms }) {
   return (
      <Menu>
         {map(platforms, (item) => (
            <Link href={`/games/${item.url}`} key={item.id}>
               <Menu.Item as="a" name={item.url}>
                  {item.title}
               </Menu.Item>
            </Link>
         ))}
      </Menu>
   );
}

// Menu Usuario
function MenuOptions({ onShowModal, user, logout }) {
   return (
      <Menu>
         {user ? (
            <>
               <Link href="/orders">
                  <Menu.Item as="a">
                     <Icon name="game" />
                     Mis Pedidos
                  </Menu.Item>
               </Link>
               <Link href="/wishlist">
                  <Menu.Item as="a">
                     <Icon name="heart outline" />
                     Favoritos
                  </Menu.Item>
               </Link>
               <Link href="/account">
                  <Menu.Item as="a">
                     <Icon name="user outline" />
                     {user.name} {user.lastname}
                  </Menu.Item>
               </Link>
               <Link href="/cart">
                  <Menu.Item as="a" className="m-0">
                     <Icon name="cart" />
                  </Menu.Item>
               </Link>
               <Menu.Item onClick={logout} className="m-0">
                  <Icon name="power off" />
               </Menu.Item>
            </>
         ) : (
            <Menu.Item onClick={onShowModal}>
               <Icon name="user outline" />
               Iniciar Sesión
            </Menu.Item>
         )}
      </Menu>
   );
}
