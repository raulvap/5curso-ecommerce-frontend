import React from "react";
import { Tab } from "semantic-ui-react";
import InfoGame from "../InfoGame";

export default function TabsGame({ game }) {
   const panes = [
      {
         menutItem: "Información",
         render: () => (
            <Tab.Pane>
               <InfoGame game={game} />
            </Tab.Pane>
         ),
      },
      {
         menutItem: "Comentarios",
         render: () => (
            <Tab.Pane>
               <h1>Comentarios Tab</h1>
            </Tab.Pane>
         ),
      },
   ];

   return <Tab className="tabs-game" panes={panes} />;
}
