import React, { useState } from "react";
import Layout from "../../../components/layout/Layout";

const Agendamento: React.FC = () => {
  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [servico, setServico] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [mostrarPopup, setMostrarPopup] = useState(false);

  const clientes = ["Cliente 1", "Cliente 2", "Cliente 3"]; // Simulação

  const selecionarCliente = (cliente: string) => {
    setClienteSelecionado(cliente);
    setMostrarPopup(false);
  };

  const handleAgendamento = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Cliente:", clienteSelecionado);
    console.log("Serviço:", servico);
    console.log("Data e Hora:", dataHora);
    // Aqui você pode integrar com o backend ou salvar os dados
  };

  return (
    <Layout>
      <h1 className="mb-4">Agendar Serviço</h1>
      <form onSubmit={handleAgendamento}>
        <div className="mb-3">
          <label className="form-label fs-5">Cliente</label>
          <button
            type="button"
            className="btn btn-primary d-block"
            onClick={() => setMostrarPopup(true)}
          >
            Selecionar Cliente
          </button>
          {clienteSelecionado && (
            <p className="mt-2">
              Cliente Selecionado: <strong>{clienteSelecionado}</strong>
            </p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="servico" className="form-label fs-5">Serviço</label>
          <select
            id="servico"
            className="form-select"
            value={servico}
            onChange={(e) => setServico(e.target.value)}
            required
          >
            <option value="">Selecione um serviço</option>
            <option value="Serviço 1">Serviço 1</option>
            <option value="Serviço 2">Serviço 2</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="dataHora" className="form-label fs-5">Data e Hora</label>
          <input
            type="datetime-local"
            id="dataHora"
            className="form-control"
            value={dataHora}
            onChange={(e) => setDataHora(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">Agendar</button>
      </form>

      {mostrarPopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Selecione um Cliente</h3>
            <ul className="list-group">
              {clientes.map((cliente) => (
                <li
                  key={cliente}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {cliente}
                  <button
                    className="btn btn-success"
                    onClick={() => selecionarCliente(cliente)}
                  >
                    Selecionar
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="btn btn-secondary mt-3"
              onClick={() => setMostrarPopup(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Agendamento;
