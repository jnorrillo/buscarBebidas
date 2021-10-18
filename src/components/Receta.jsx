import React, {useContext, useState} from 'react';
import { ModalContext } from '../context/ModalContext';

//importando modal
import Modal from "@material-ui/core/Modal";
//utilidad de matirial ui para escribir codigo css en formato JS
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
    //define la ubicaion del modal mas de ubicacion
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

//agrega estilos
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    maxHeight: 'calc(100vh - 210px)',
    overflowY: 'auto',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Receta = ({receta}) => {

    //cofiguracion del modal de material-ui
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    //modal para abrir
    const handleOpen = () => {
        setOpen(true);
    }
    //modal para cerrar
    const handleClose = () => {
        setOpen(false);
    }

    //extraer valores del contex
    const { informacion, guardarIdReceta, guardarReceta } =
      useContext(ModalContext);
    
      //muestra y formatea los ingredientes
      const mostrarIngredientes = informacion => {
          let ingredientes = [];

          for (let i = 1; i < 16; i++) { 
              if(informacion[`strIngredient${i}`]){
                  ingredientes.push(
                    <li key={i}>
                      {informacion[`strIngredient${i}`]}
                      {informacion[`strMeasure${i}`]}
                    </li>
                  );
              }
           }

           return ingredientes;
      }
      
    return (
      <div className="col-md-4 mb-3">
        <div className="card">
          <h2 className="card-header">{receta.strDrink}</h2>
          <img
            src={receta.strDrinkThumb}
            alt={`Imagen de ${receta.strDrink}`}
            className="card-img-top"
          />
          <div className="card-body">
            <button
              type="button"
              className="btn btn-block btn-primary"
              onClick={() => {
                guardarIdReceta(receta.idDrink);
                handleOpen();
              }}
            >
              Ver Receta
            </button>

            <Modal
              open={open}
              onClose={() => {
                guardarIdReceta(null); //con esto limpiamos el state, sacamos el id que colocamos en button
                guardarReceta({}); //Con esto evitamos que la imagen anterior se cargue po unos segundos y se muestre la que seleccionamos
                handleClose();
              }}
            >
              <div style={modalStyle} className={classes.paper}>
                <h2>{informacion.strDrink}</h2>
                <h3 className="mt-4">Instrucciones</h3>
                <p className="text-justify">{informacion.strInstructions}</p>
                <img
                  src={informacion.strDrinkThumb}
                  alt="Imagen bebida"
                  className="img-fluid my-4"
                />
                <h3>Ingredientes y cantidades</h3>
                <ul>
                    { mostrarIngredientes(informacion) }
                </ul>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    );
}
 
export default Receta;