import React from "react";
import { useRouter } from "next/router";
// --- COMPONENTS ---
import BasicLayout from "../../layouts/BasicLayout";

export default function Platform() {
   const router = useRouter();
   console.log(router);
   return (
      <BasicLayout>
         <h2>Estamos en Plataformas</h2>
      </BasicLayout>
   );
}
