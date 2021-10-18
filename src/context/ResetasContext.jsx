import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const ResetasContext = createContext();

const RecetasProvider = (props) => {

    const [recetas, setRecetas] = useState([]);
    const [busqueda, buscarResetas] = useState({
        nombre: '',
        categoria: ''
    })
    const [consular, setConsular] = useState(false);

    const {nombre, categoria} = busqueda;

    useEffect(() => {
      if(consular){
        const obtenerRecetas = async () => {
          const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
          
          const resultado = await axios.get(url);

          //console.log(resultado.data.drinks);
          setRecetas(resultado.data.drinks);
        };

        obtenerRecetas();
      }
    }, [busqueda, consular, nombre, categoria]);

    return (
      <ResetasContext.Provider value={{ recetas, buscarResetas, setConsular }}>
        {props.children}
      </ResetasContext.Provider>
    );
}
 
export default RecetasProvider;