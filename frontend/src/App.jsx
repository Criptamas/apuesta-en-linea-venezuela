import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Landing } from "./pages/Landing"
import { Resultados } from './Resultados/index.jsx'
import { Analytics } from '@vercel/analytics/react';

function App() {

  return (
    <BrowserRouter>
      <Routes>
    <Route path='/' element={<Landing />} />
    <Route path='/resultados-hora' element={<Resultados />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
);
}

export default App
