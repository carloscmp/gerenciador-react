import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/layout/Layout";
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-..." crossOrigin="anonymous" />


const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <h1>WTEC REFRIGERAÇÃO</h1>
      <p>Escolha uma opção para começar:</p>
      <div className="d-flex justify-content-center gap-3 mt-4">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/cliente")}
        >
          Cadastrar Cliente
        </button>
        <button
          className="btn btn-success"
          onClick={() => navigate("/servico")}
        >
          Cadastrar Serviço
        </button>
        <button className="btn btn-success" onClick={() => navigate('/agendamento')}>
            Agendar Serviço
          </button>
      </div>
    </Layout>
  );
};

export default Home;
