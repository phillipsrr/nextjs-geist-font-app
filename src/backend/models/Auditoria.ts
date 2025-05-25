export interface Auditoria {
  id: string;
  usuarioId: string;
  accion: string; // Description of the action performed
  fecha: Date;
  detalles?: string; // Optional additional details about the action
}
