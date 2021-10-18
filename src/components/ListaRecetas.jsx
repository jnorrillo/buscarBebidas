import React, {useContext} from 'react';
import Receta from './Receta';

import { ResetasContext } from '../context/ResetasContext';

const ListaRecetas = () => {

    //extraer las recetas
    const { recetas } = useContext(ResetasContext);

    return ( 
        <div className="row mt-5">
            {recetas.map(receta => (
                <Receta key={receta.idDrink} receta={receta}></Receta>
            ))}
        </div>
     );
}
 
export default ListaRecetas;