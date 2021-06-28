import React, { useState, useEffect } from "react";
import { Grid, Button } from "semantic-ui-react";
// Para listar direcciones, usamos lodash (lesson 84)
import { map, size } from "lodash";
import { toast } from "react-toastify";
import { getAddressApi, deleteAddressApi } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";

export default function ListAddress(props) {
   const { reloadAddreses, setReloadAddreses, openModal } = props;
   const [addresses, setAddresses] = useState(null);
   // del context sacamos:
   const { auth, logout } = useAuth();

   useEffect(() => {
      // hacemos una función async que se auto-llame (lesson 83)
      (async () => {
         const response = await getAddressApi(auth.idUser, logout);
         // si response es nulo (no hay direcciones), entonces pon un array vacío:
         setAddresses(response || []);
         setReloadAddreses(false);
      })();
   }, [auth.idUser, reloadAddreses]);

   // si no hay direcciones, return null. Sirve para que no se muestre mientras se cargan las direcciones, puede poner un spinner aqui
   if (!addresses) return null;

   return (
      <div className="list-address">
         {
            // size viene de lodash y nos dice el tamaño del array, si es 0 entonces no hay:
            size(addresses) === 0 ? (
               <h3>No hay direcciones creadas</h3>
            ) : (
               <Grid>
                  {map(addresses, (address) => (
                     <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                        <Address
                           address={address}
                           logout={logout}
                           setReloadAddreses={setReloadAddreses}
                           openModal={openModal}
                        />
                     </Grid.Column>
                  ))}
               </Grid>
            )
         }
      </div>
   );
}

function Address(props) {
   const { address, logout, setReloadAddreses, openModal } = props;
   const [loadingDelete, setLoadingDelete] = useState(false);

   const deleteAddress = async () => {
      setLoadingDelete(true);
      const response = await deleteAddressApi(address._id, logout);
      if (response) setReloadAddreses(true);
      toast.success("Dirección eliminada");
      setLoadingDelete(false);
   };

   return (
      <div className="address">
         <p>{address.title}</p>
         <p>{address.name}</p>
         <p>{address.address}</p>
         <p>
            {address.state}, {address.city} {address.postalCode}
         </p>
         <p>{address.phone}</p>

         <div className="actions">
            <Button
               primary
               onClick={() =>
                  // Le mandamos los 2 parámetos a la función para que se muestren los datos:
                  openModal(`Editar: ${address.title}`, address)
               }
            >
               Editar
            </Button>
            <Button onClick={deleteAddress} loading={loadingDelete}>
               Eliminar
            </Button>
         </div>
      </div>
   );
}
