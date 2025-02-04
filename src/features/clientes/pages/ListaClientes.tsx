import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import Layout from "../../../components/layout/Layout";
import api from "../../../services/api";

const ListaClientes: React.FC = () => {
  interface Cliente {
    id: number;
    nome: string;
    endereco: string;
    telefone: string;
  }

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);

  // Fetch inicial para carregar a lista de clientes
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await api.get("/cliente");
        setClientes(response.data as Cliente[]);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        alert("Erro ao carregar a lista de clientes.");
      }
    };

    fetchClientes();
  }, []);

  // Função para deletar um cliente
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/cliente/${id}`);
      alert("Cliente deletado com sucesso!");
      setClientes(clientes.filter((cliente) => cliente.id !== id));
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      alert("Erro ao deletar cliente.");
    }
  };

  // Função para abrir o modal de edição
  const handleEdit = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setShowModal(true);
  };

  // Função para salvar as alterações
  const handleSave = async () => {
    if (selectedCliente) {
      try {
        const response = await api.put("/cliente", selectedCliente);
        alert("Cliente atualizado com sucesso!");
        setClientes(
          clientes.map((cliente) =>
            cliente.id === (response.data as Cliente).id
              ? (response.data as Cliente)
              : cliente
          )
        );
        setShowModal(false);
        setSelectedCliente(null);
      } catch (error) {
        console.error("Erro ao atualizar cliente:", error);
        alert("Erro ao atualizar cliente.");
      }
    }
  };

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
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.endereco}</td>
                <td>{cliente.telefone}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEdit(cliente)}
                  >
                    ✏️ Atualizar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(cliente.id)}
                  >
                    🗑️ Deletar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Nenhum cliente encontrado.</p>
      )}

      {/* Modal para editar cliente */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCliente && (
            <Form>
              <Form.Group className="mb-3" controlId="formNome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedCliente.nome}
                  onChange={(e) =>
                    setSelectedCliente({
                      ...selectedCliente,
                      nome: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEndereco">
                <Form.Label>Endereço</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedCliente.endereco}
                  onChange={(e) =>
                    setSelectedCliente({
                      ...selectedCliente,
                      endereco: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formTelefone">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedCliente.telefone}
                  onChange={(e) =>
                    setSelectedCliente({
                      ...selectedCliente,
                      telefone: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default ListaClientes;
