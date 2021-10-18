import axios from 'axios';
import React, {createContext, useState, useEffect} from 'react';

//crear el context
//crea el context y va a estar en la funcion categoriascontext
export const CateogiasContext = createContext();

//cuando se crea un context debes crear un provaider
//El provaider es de donde van a salir los datos y las funciones y states
const CategoriasProvider = (props) => {
    //creando el state del context
    const [ categorias, gaurdarCategorias ] = useState([]);

    //ejecutar el llamado a la api
    useEffect( () => {
        const obtenerCategorias = async () => {
            const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

            const categoria = await axios.get(url);

            gaurdarCategorias(categoria.data.drinks);
        }

        obtenerCategorias();
    },[] )

    return (
      <CateogiasContext.Provider value={{ categorias }}>
        {props.children}
      </CateogiasContext.Provider>
    );
}

export default CategoriasProvider;
 