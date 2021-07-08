import React, { useState, useEffect } from "react";
import { Container, Grid, Image, Input } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function TopBar() {
   return (
      <div className="top-bar">
         <Container>
            <Grid className="top-bar">
               <Grid.Column width={8} className="top-bar__left">
                  <Logo />
               </Grid.Column>
               <Grid.Column width={8} className="top-bar__right">
                  <Search />
               </Grid.Column>
            </Grid>
         </Container>
      </div>
   );
}

function Logo() {
   return (
      <Link href="/">
         <a>
            <Image src="/png/logo.png" alt="Gaming" />
         </a>
      </Link>
   );
}

// Componente de Buscador (lesson 41 y 120)
function Search() {
   const [searchStr, setSearchStr] = useState("");
   const [load, setLoad] = useState(false);
   const router = useRouter();

   useEffect(() => {
      if (load) {
         // va a mandar la dirección a donde se busque el juego
         router.push(`/search?query=${searchStr}`);
      }
      setLoad(true);
   }, [searchStr]);

   return (
      <Input
         id="search-game"
         icon={{ name: "search" }}
         placeholder="Buscar"
         value={
            // para que tenga el valor que estamos buscando (lesson 120)
            router.query.query
         }
         onChange={(_, data) => setSearchStr(data.value)}
      />
   );
}
