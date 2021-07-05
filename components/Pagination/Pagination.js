import React from "react";
import { Pagination as PaginationSU } from "semantic-ui-react";
import { useRouter } from "next/router";
import queryString from "query-string";

export default function Pagination(props) {
   const { totalGames, page, limitPerPage } = props;
   const router = useRouter();

   // Para sacar el total de páginas, redondeamos a la alza: (lesson 101)
   const totalPages = Math.ceil(totalGames / limitPerPage);

   // Para obtener la página actual: (lesson 101, min 11)
   const urlParse = queryString.parseUrl(router.asPath);

   // Para cambiar de página: (lesson 101)
   const goToPage = (newPage) => {
      urlParse.query.page = newPage;
      const url = queryString.stringifyUrl(urlParse);
      router.push(url);
   };

   return (
      <div className="pagination">
         <PaginationSU
            defaultActivePage={page}
            totalPages={totalPages}
            firstItem={null}
            lastItem={null}
            onPageChange={(_, data) => goToPage(data.activePage)}
            boundaryRange={0}
            siblingRange={1}
            ellipsisItem={null}
         />
      </div>
   );
}
