import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import './index.css';
import Servico from './features/servicos/pages/Servico';
import Cliente from './features/clientes/pages/Cliente';
import Agendamento from './features/agendamentos/pages/Agendamento';
import ListaClientes from './features/clientes/pages/ListaClientes';
import AtualizarCliente from './features/clientes/pages/AtualizarCliente';
import Home from './features/home/pages/Home';


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
