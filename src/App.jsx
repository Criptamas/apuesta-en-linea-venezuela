import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Landing } from "./pages/Landing"
import { Resultados } from './Resultados/index.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
    <Route path='/' element={<Landing />} />
    <Route path='/resultados-hora' element={<Resultados />} />
      </Routes>
    </BrowserRouter>
);
}

export default App
