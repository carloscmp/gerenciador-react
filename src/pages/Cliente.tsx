import React, { useState } from "react";
import Layout from "../components/Layout";
import { Button, Row } from "react-bootstrap";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados enviados:", formData);
    alert("Cliente cadastrado com sucesso!");
    setFormData({ nome: "", endereco: "", telefone: "" });
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
    </Layout>
  );
};

export default Cliente;
