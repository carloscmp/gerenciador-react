import { Cliente } from '../../clientes/types/Cliente';
import { Servico } from '../../servicos/types/Servico';

export interface Agendamento {
  id: number;          // ID do agendamento
  cliente: Cliente;    // Cliente relacionado
  servico: Servico;    // Serviço agendado
  data: string;        // Data do agendamento (ISO 8601)
  confirmado: boolean; // Status de confirmação
}
