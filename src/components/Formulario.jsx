import React, { useContext, useState } from "react";

import { CateogiasContext } from "../context/CategoriasContext";
import { ResetasContext } from "../context/ResetasContext";

const Formulario = () => {
  //crear un useState
  const [busqueda, setBusqueda] = useState({
    nombre: "",
    categoria: "",
  });

  //importamos useContext
  const { categorias } = useContext(CateogiasContext);
  const { buscarResetas, setConsular } = useContext(ResetasContext);

  //funcion para leer los contenidos
  const obtenerDatosReceta = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className="col-12" onSubmit={e => {
        e.preventDefault();
        buscarResetas(busqueda);
        setConsular(true);
    }}>
      <fieldset className="text-center">
        <legend>Busca bebidas por Categoria o Ingrediente</legend>
      </fieldset>
      <div className="row mt-4">
        <div className="col-md-4 mt-2">
          <input
            type="text"
            name="nombre"
            className="form-control"
            placeholder="Buscar por Ingrediente"
            onChange={obtenerDatosReceta}
          />
        </div>
        <div className="col-md-4 mt-2">
          <select
            name="categoria"
            className="form-control"
            onChange={obtenerDatosReceta}
          >
            <option value="">-- Seleciona Categoria --</option>
            {categorias.map((categoria) => (
              <option key={categoria.strCategory} value={categoria.strCategory}>
                {categoria.strCategory}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <input
            type="submit"
            className="btn btn-block btn-primary mt-2"
            value="Buscar Bebidas"
          />
        </div>
      </div>
    </form>
  );
};

export default Formulario;
