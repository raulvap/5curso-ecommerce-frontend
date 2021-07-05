import { useState, useEffect } from "react";

export default function useWindowSize() {
   // Creamos un hook nuevo para actualizar el tamaño de la pantalla (lesson 97)
   const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
   });

   useEffect(() => {
      function handleResize() {
         setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
         });
      }

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => window.removeEventListener("resize", handleResize);
   }, []);

   return windowSize;
}
