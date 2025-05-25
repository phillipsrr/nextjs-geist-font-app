export interface Estado {
  id: string;
  nombre: string; // e.g., "pendiente", "completado"
  descripcion?: string;
  createdAt: Date;
  updatedAt: Date;
}
