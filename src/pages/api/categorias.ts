import { NextApiRequest, NextApiResponse } from 'next';
import { Categoria } from '../../../src/backend/models/Categoria';
import { v4 as uuidv4 } from 'uuid';

let categorias: Categoria[] = [
  {
    id: '1',
    usuarioId: '1',
    nombre: 'Trabajo',
    descripcion: 'Tareas relacionadas con el trabajo',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    usuarioId: '1',
    nombre: 'Personal',
    descripcion: 'Tareas personales',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { usuarioId } = req.query;
    let filteredCategorias = categorias;
    if (usuarioId) {
      filteredCategorias = categorias.filter(c => c.usuarioId === usuarioId);
    }
    return res.status(200).json(filteredCategorias);
  } else if (req.method === 'POST') {
    const { usuarioId, nombre, descripcion } = req.body;
    const newCategoria: Categoria = {
      id: uuidv4(),
      usuarioId,
      nombre,
      descripcion,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    categorias.push(newCategoria);
    return res.status(201).json(newCategoria);
  } else if (req.method === 'PUT') {
    const { id, nombre, descripcion } = req.body;
    const categoriaIndex = categorias.findIndex(c => c.id === id);
    if (categoriaIndex === -1) {
      return res.status(404).json({ error: 'Category not found' });
    }
    const categoria = categorias[categoriaIndex];
    categorias[categoriaIndex] = {
      ...categoria,
      nombre: nombre ?? categoria.nombre,
      descripcion: descripcion ?? categoria.descripcion,
      updatedAt: new Date(),
    };
    return res.status(200).json(categorias[categoriaIndex]);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    const categoriaIndex = categorias.findIndex(c => c.id === id);
    if (categoriaIndex === -1) {
      return res.status(404).json({ error: 'Category not found' });
    }
    categorias.splice(categoriaIndex, 1);
    return res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
