import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import Layout from "../../../components/layout/Layout_";
import api from "../../../services/api";

const Cliente: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    telefone: "",
  });

  const toast = useRef<Toast>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/cliente", formData);

      if (response.status === 201) {
        toast.current?.show({
          severity: "success",
          summary: "Sucesso!",
          detail: "Cliente cadastrado com sucesso!",
          life: 3000,
        });

        setFormData({ nome: "", endereco: "", telefone: "" }); // Limpa o formulário
      } else {
        toast.current?.show({
          severity: "warn",
          summary: "Erro",
          detail: "Erro inesperado. Tente novamente.",
          life: 3000,
        });
      }
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Erro ao cadastrar cliente.",
        life: 3000,
      });
    }
  };

  return (
    <Layout>
      <Toast ref={toast} />

      <div className="grid justify-content-center">
        <div className="col-12 md:col-6">
          <Card title="Cadastrar Cliente">
            <form onSubmit={handleSubmit} className="p-fluid">
              <div className="field">
                <label htmlFor="nome">Nome</label>
                <InputText
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="endereco">Endereço</label>
                <InputText
                  id="endereco"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="telefone">Telefone</label>
                <InputText
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                  placeholder="(00) 0 0000-0000"
                />
              </div>

              <Button type="submit" label="Cadastrar" icon="pi pi-check" />
            </form>
          </Card>

          <Button
            className="mt-3 p-button-secondary"
            label="Ver Lista de Clientes"
            icon="pi pi-list"
            onClick={() => window.open("/lista-clientes", "_blank")}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Cliente;
