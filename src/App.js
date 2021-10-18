import React from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import ListaRecetas from './components/ListaRecetas';

import CategoriasProvider from './context/CategoriasContext';
import RecetasProvider from './context/ResetasContext';
import ModalProvider from './context/ModalContext';

function App() {
  return (
    <CategoriasProvider>
      <RecetasProvider>
        <ModalProvider>
          <Header></Header>
          <div className="container mt-5">
            <div className="row">
              <Formulario></Formulario>
            </div>
            <ListaRecetas></ListaRecetas>
          </div>
        </ModalProvider>
      </RecetasProvider>
    </CategoriasProvider>
  )
}

export default App;
