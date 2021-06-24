import React from "react";
import { Container } from "semantic-ui-react";
import classNames from "classnames";
import Header from "../../components/Header";

export default function BasicLayout({ children, className }) {
   // Vamos a utilizar classNames para hacer dinámicas las clases: (lesson 65)

   return (
      <Container
         fluid
         className={classNames("basic-layout", {
            [className]: className,
         })}
      >
         <Header />
         <Container className="content">{children}</Container>
      </Container>
   );
}
