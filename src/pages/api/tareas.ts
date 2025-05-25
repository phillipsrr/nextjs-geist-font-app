import { NextApiRequest, NextApiResponse } from 'next';
import { Tarea } from '../../../src/backend/models/Tarea';
import { v4 as uuidv4 } from 'uuid';

let tareas: Tarea[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // List all tasks or filter by query params
    const { usuarioId, categoriaId, estadoId, fechaAsignada } = req.query;
    let filteredTareas = tareas;

    if (usuarioId) {
      filteredTareas = filteredTareas.filter(t => t.usuarioId === usuarioId);
    }
    if (categoriaId) {
      filteredTareas = filteredTareas.filter(t => t.categoriaId === categoriaId);
    }
    if (estadoId) {
      filteredTareas = filteredTareas.filter(t => t.estadoId === estadoId);
    }
    if (fechaAsignada) {
      filteredTareas = filteredTareas.filter(t => t.fechaAsignada.toISOString().startsWith(fechaAsignada as string));
    }

    return res.status(200).json(filteredTareas);
  } else if (req.method === 'POST') {
    // Create new task
    const { usuarioId, descripcion, fechaAsignada, categoriaId, estadoId } = req.body;
    const newTarea: Tarea = {
      id: uuidv4(),
      usuarioId,
      descripcion,
      fechaAsignada: new Date(fechaAsignada),
      categoriaId,
      estadoId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    tareas.push(newTarea);
    return res.status(201).json(newTarea);
  } else if (req.method === 'PUT') {
    // Update task
    const { id, descripcion, fechaAsignada, categoriaId, estadoId } = req.body;
    const tareaIndex = tareas.findIndex(t => t.id === id);
    if (tareaIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
    const tarea = tareas[tareaIndex];
    tareas[tareaIndex] = {
      ...tarea,
      descripcion: descripcion ?? tarea.descripcion,
      fechaAsignada: fechaAsignada ? new Date(fechaAsignada) : tarea.fechaAsignada,
      categoriaId: categoriaId ?? tarea.categoriaId,
      estadoId: estadoId ?? tarea.estadoId,
      updatedAt: new Date(),
    };
    return res.status(200).json(tareas[tareaIndex]);
  } else if (req.method === 'DELETE') {
    // Delete task
    const { id } = req.query;
    const tareaIndex = tareas.findIndex(t => t.id === id);
    if (tareaIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
    tareas.splice(tareaIndex, 1);
    return res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
