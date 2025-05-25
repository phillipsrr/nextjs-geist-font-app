export interface Tarea {
  id: string;
  usuarioId: string;
  descripcion: string;
  fechaAsignada: Date;
  categoriaId: string;
  estadoId: string;
  createdAt: Date;
  updatedAt: Date;
}
