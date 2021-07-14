import React, { useState, useEffect } from "react";
import Link from "next/link";
import { map, size } from "lodash";
import classNames from "classnames";
import { getAddressApi } from "../../../api/address";
import { Grid } from "semantic-ui-react";
import useAuth from "../../../hooks/useAuth";

export default function AddressShipping({ setAddress }) {
   const [addresses, setAddresses] = useState(null);
   const [addressActive, setAddressActive] = useState(null);
   const { auth, logout } = useAuth();

   useEffect(() => {
      (async () => {
         //función anónima async autoejecutable para obtener las direcciones (lesson 132)
         const response = await getAddressApi(auth.idUser, logout);
         setAddresses(response || []);
      })();
   }, []);

   return (
      <div className="address-shipping">
         <div className="title">Direcciónes de Envío</div>
         <div className="data">
            {size(addresses) === 0 ? (
               <>
                  <h3>No hay direcciones de envío creadas</h3>
                  <Link href="/account">
                     <a>+ Agregar Dirección</a>
                  </Link>
               </>
            ) : (
               <Grid>
                  {map(addresses, (item) => (
                     <Grid.Column key={item.id} mobile={16} tablet={8} computer={4}>
                        <Address
                           address={item}
                           addressActive={addressActive}
                           setAddressActive={setAddressActive}
                           //    setAddress es la que nos llega x props:
                           setAddress={setAddress}
                        />
                     </Grid.Column>
                  ))}
               </Grid>
            )}
         </div>
      </div>
   );
}

function Address(props) {
   const { address, addressActive, setAddressActive, setAddress } = props;

   const changeAddress = () => {
      setAddressActive(address._id);
      setAddress(address);
   };

   return (
      // vamos a utilizar classnames para cuando se selecciona un address (lesson 134)
      <div
         className={classNames("address", {
            //va a aplicar la clase "address" siempre que se cumpla la condición:
            active: addressActive === address._id,
         })}
         onClick={changeAddress}
      >
         <p>{address.title}</p>
         <p>{address.name}</p>
         <p>{address.address}</p>
         <p>
            {address.city}, {address.state}, {address.postalCode}
         </p>
         <p>{address.phone}</p>
      </div>
   );
}
