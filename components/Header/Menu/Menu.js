import React, { useState } from "react";
import Link from "next/link";
import { Container, Menu, Grid, Icon, Label } from "semantic-ui-react";

// --- COMPONENTS ---
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth";

export default function MenuWeb() {
   const [showModal, setShowModal] = useState(false);
   const [titleModal, setTitleModal] = useState("Iniciar Sesión");

   const onShowModal = () => setShowModal(true);
   const onCloseModal = () => setShowModal(false);

   return (
      <div className="menu">
         <Container>
            <Grid>
               <Grid.Column className="menu__left" width={6}>
                  <MenuPlatforms />
               </Grid.Column>
               <Grid.Column className="menu__right" width={10}>
                  <MenuOptions onShowModal={onShowModal} />
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
function MenuPlatforms() {
   return (
      <Menu>
         <Link href="/play-station">
            <Menu.Item as="a">PlayStation</Menu.Item>
         </Link>
         <Link href="/play-station">
            <Menu.Item as="a">Xbox</Menu.Item>
         </Link>
         <Link href="/play-station">
            <Menu.Item as="a">Nintendo</Menu.Item>
         </Link>
      </Menu>
   );
}

// Menu Usuario
function MenuOptions({ onShowModal }) {
   return (
      <Menu>
         <Menu.Item onClick={onShowModal}>
            <Icon name="user outline" />
            Mi Cuenta
         </Menu.Item>
      </Menu>
   );
}
