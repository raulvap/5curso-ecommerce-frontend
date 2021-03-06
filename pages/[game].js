import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// --- API ---
import { getGameByUrlApi } from "../api/game";

// --- COMPONENTS ---
import BasicLayout from "../layouts/BasicLayout";
import HeaderGame from "../components/Game/HeaderGame";
import TabsGame from "../components/Game/TabsGame";
import Seo from "../components/Seo";

export default function Game() {
   const [game, setGame] = useState(null);
   const { query } = useRouter();
   console.log(game);

   useEffect(() => {
      (async () => {
         const response = await getGameByUrlApi(query.game);
         setGame(response);
      })();
   }, [query]);

   if (!game) return null;

   return (
      <BasicLayout className="game">
         <Seo title={game.title} description={game.summary} />
         <HeaderGame game={game} />
         <TabsGame game={game} />
      </BasicLayout>
   );
}
