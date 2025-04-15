import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
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

  const handleEdit = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setShowModal(true);
  };

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
        <>
          {/* Tabela para telas grandes */}
          <div>
            <Table
              striped
              bordered
              hover
              className="table-dark"
              style={{ tableLayout: "fixed" }}
            >
              <thead>
                <tr className="">
                  <th className="text-center p-3" style={{ width: "5%" }}>
                    ID
                  </th>
                  <th className="text-center p-3">Nome</th>
                  <th className="text-center p-3">Endereço</th>
                  <th className="text-center p-3" style={{ width: "15%" }}>
                    Telefone
                  </th>
                  <th className="text-center p-3" style={{ width: "14%" }}>
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cliente) => (
                  <tr key={cliente.id}>
                    <td className="text-center p-3">{cliente.id}</td>
                    <td className="text-center p-3">{cliente.nome}</td>
                    <td className="text-center p-3">{cliente.endereco}</td>
                    <td className="text-center p-3">{cliente.telefone}</td>
                    <td>
                      <div className="d-flex justify-content-start gap-1">
                        <Button
                          variant="warning"
                          className="d-flex align-items-center"
                          onClick={() => handleEdit(cliente)}
                        >
                          <PencilSquare className="me-1" /> Editar
                        </Button>
                        <Button
                          variant="danger"
                          className="d-flex align-items-center"
                          onClick={() => handleDelete(cliente.id)}
                        >
                          <Trash className="me-1" /> Deletar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Cards para telas menores */}
          <div className="d-md-none mt-4">
            {clientes.map((cliente) => (
              <div
                key={cliente.id}
                className="card mb-3 p-3 shadow-sm"
                style={{ backgroundColor: "#f9f9f9" }}
              >
                <p>
                  <strong>ID:</strong> {cliente.id}
                </p>
                <p>
                  <strong>Nome:</strong> {cliente.nome}
                </p>
                <p>
                  <strong>Endereço:</strong> {cliente.endereco}
                </p>
                <p>
                  <strong>Telefone:</strong> {cliente.telefone}
                </p>
                <div className="d-flex justify-content-start">
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEdit(cliente)}
                  >
                    <PencilSquare />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(cliente.id)}
                  >
                    <Trash />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Nenhum cliente encontrado.</p>
      )}

      {/* Modal para edição */}
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
