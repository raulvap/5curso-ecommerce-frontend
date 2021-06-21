import { Container, Menu, Grid, Icon, Label } from "semantic-ui-react";
import Link from "next/link";

export default function MenuWeb() {
   return (
      <div className="menu">
         <Container>
            <Grid>
               <Grid.Column className="menu__left" width={6}>
                  <MenuPlatforms />
               </Grid.Column>
               <Grid.Column className="menu__right" width={10}>
                  <MenuOptions />
               </Grid.Column>
            </Grid>
         </Container>
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
function MenuOptions() {
   return (
      <Menu>
         <Menu.Item>
            <Icon name="user outline" />
            Mi Cuenta
         </Menu.Item>
      </Menu>
   );
}
