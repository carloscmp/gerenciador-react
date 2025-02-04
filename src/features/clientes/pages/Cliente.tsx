import React, { useState } from "react";
import { Button, Row } from "react-bootstrap";
import Layout from "../../../components/layout/Layout";
import api from "../../../services/api";

const Cliente: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    telefone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/cliente", formData);

      if (response.status === 201) {
        alert("Cliente cadastrado com sucesso!");
        setFormData({ nome: "", endereco: "", telefone: "" }); // Limpa o formulário
      } else {
        alert("Erro inesperado. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      alert("Erro ao cadastrar cliente.");
    }
  };

  return (
    <Layout>
      <Row>
        <h1>Cadastrar Cliente</h1>
        <form
          onSubmit={handleSubmit}
          className="mt-4"
          style={{ maxWidth: "500px" }}
        >
          <div className="mb-3 ">
            <label htmlFor="nome" className="form-label ">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              className="form-control "
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="endereco" className="form-label">
              Endereço
            </label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              className="form-control"
              value={formData.endereco}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 w-50 align-items-center">
            <label htmlFor="telefone" className="form-label">
              Telefone
            </label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              className="form-control"
              value={formData.telefone}
              onChange={handleChange}
              required
              placeholder="(00) 0 0000-0000)"
            />
          </div>
          <Button variant="info" type="submit">
            Cadastrar
          </Button>
        </form>
      </Row>
      <Button
        variant="primary"
        className="mt-3"
        onClick={() => window.open("/lista-clientes", "_blank")}
      >
        Ver Lista de Clientes
      </Button>
    </Layout>
  );
};

export default Cliente;
