import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import { Table } from "react-bootstrap";

const ListaClientes: React.FC = () => {
  interface Cliente {
    id: number;
    nome: string;
    endereco: string;
    telefone: string;
  }

  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await api.get("/cliente"); // Certifique-se de que esta URL está correta
        console.log("Clientes recebidos:", response.data); // Log para verificar os dados recebidos
        setClientes(response.data as Cliente[]);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        alert("Erro ao carregar a lista de clientes.");
      }
    };
  
    fetchClientes();
  }, []);
  

  return (
    <Layout>
      <h1>Lista de Clientes</h1>
      {clientes.length > 0 ? (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente: any) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.endereco}</td>
                <td>{cliente.telefone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Nenhum cliente encontrado.</p>
      )}
    </Layout>
  );
};

export default ListaClientes;
