import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import RegisterService from './pages/RegisterService';
import RegisterClient from './pages/RegisterClient';
import AgendarServico from './pages/AgendarServico';
import './App.css';


const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servico" element={<RegisterService />} />
        <Route path="/cliente" element={<RegisterClient />} />
        <Route path="/agendamento" element={<AgendarServico />} />
      </Routes>
    </div>
  );
};

export default App;
