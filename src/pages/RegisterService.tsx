import React, { useState } from "react";
import Layout from "../components/Layout";

const RegisterService: React.FC = () => {
  const [nomeServico, setNomeServico] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Serviço cadastrado:', nomeServico);
    setNomeServico('');
  };

  return (
    <Layout>
      <div className="container text-center">
        <h2>Cadastrar Serviço</h2>
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <label htmlFor="nomeServico" className="form-label fs-5">Nome do Serviço</label>
            <input
              type="text"
              id="nomeServico"
              className="form-control"
              value={nomeServico}
              onChange={(e) => setNomeServico(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Cadastrar
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default RegisterService;
