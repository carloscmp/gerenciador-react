import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import './App.css';
import Servico from './pages/Servico';
import Cliente from './pages/Cliente';
import Agendamento from './pages/Agendamento';
import ListaClientes from './pages/ListaClientes';
import AtualizarCliente from './pages/AtualizarCliente';


const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servico" element={<Servico />} />
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/agendamento" element={<Agendamento />} />
        <Route path="/lista-clientes" element={<ListaClientes />} />
        <Route path="/atualizar-cliente/:id" element={<AtualizarCliente />} />
      </Routes>
    </div>
  );
};

export default App;
