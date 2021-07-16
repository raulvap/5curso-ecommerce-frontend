import React from "react";
import Head from "next/head";

export default function Seo(props) {
   // Para el Head y el SEO: (lesson 149)
   const { title, description } = props;

   return (
      <Head>
         <title>{title}</title>
         <meta property="description" content={description} />
      </Head>
   );
}

Seo.defaultProps = {
   title: "Gaming - Tus juegos favoritos",
   description: "Tus juegos favoritos para Steam, PlayStation, Xbox, Switch al mejor precio.",
};
