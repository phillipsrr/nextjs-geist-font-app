export interface Categoria {
  id: string;
  usuarioId: string;
  nombre: string;
  descripcion?: string;
  createdAt: Date;
  updatedAt: Date;
}
