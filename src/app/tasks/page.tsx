"use client";

import React, { useState, useEffect } from "react";
import TaskForm from "../../components/TaskForm";

interface Tarea {
  id: string;
  descripcion: string;
  fechaAsignada: string;
  categoriaId: string;
  estadoId: string;
}

interface Categoria {
  id: string;
  nombre: string;
}

interface Estado {
  id: string;
  nombre: string;
}

export default function TasksPage() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [estados, setEstados] = useState<Estado[]>([]);
  const [filterCategoria, setFilterCategoria] = useState<string>("");
  const [filterEstado, setFilterEstado] = useState<string>("");
  const [filterFecha, setFilterFecha] = useState<string>("");
  const [editingTask, setEditingTask] = useState<Tarea | null>(null);

  useEffect(() => {
    fetchCategorias();
    fetchEstados();
    fetchTareas();
  }, []);

  async function fetchCategorias() {
    const res = await fetch("/api/categorias");
    if (res.ok) {
      const data = await res.json();
      setCategorias(data);
    }
  }

  async function fetchEstados() {
    const res = await fetch("/api/estados");
    if (res.ok) {
      const data = await res.json();
      setEstados(data);
    }
  }

  async function fetchTareas() {
    let url = "/api/tareas?";
    if (filterCategoria) url += `categoriaId=${filterCategoria}&`;
    if (filterEstado) url += `estadoId=${filterEstado}&`;
    if (filterFecha) url += `fechaAsignada=${filterFecha}&`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      setTareas(data);
    } else {
      setTareas([]);
    }
  }

  function handleFilterChange() {
    fetchTareas();
  }

  function handleEdit(task: Tarea) {
    setEditingTask(task);
  }

  async function handleSave(taskData: {
    descripcion: string;
    fechaAsignada: string;
    categoriaId: string;
    estadoId: string;
  }) {
    if (editingTask) {
      // Update existing task
      await fetch("/api/tareas", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingTask.id, ...taskData }),
      });
    } else {
      // Create new task
      await fetch("/api/tareas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
    }
    setEditingTask(null);
    fetchTareas();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/tareas?id=${id}`, { method: "DELETE" });
    fetchTareas();
  }

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans text-black bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Gestión de Tareas</h1>

      <div className="mb-6 space-y-4">
        <div className="flex space-x-4">
          <select
            value={filterCategoria}
            onChange={(e) => setFilterCategoria(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Todas las Categorías</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
          <select
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Todos los Estados</option>
            {estados.map((est) => (
              <option key={est.id} value={est.id}>
                {est.nombre}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={filterFecha}
            onChange={(e) => setFilterFecha(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleFilterChange}
            className="bg-black text-white px-4 rounded hover:bg-gray-800 transition"
          >
            Filtrar
          </button>
        </div>
      </div>

      <TaskForm
        categorias={categorias}
        estados={estados}
        onSave={handleSave}
        initialData={
          editingTask
            ? {
                descripcion: editingTask.descripcion,
                fechaAsignada: editingTask.fechaAsignada,
                categoriaId: editingTask.categoriaId,
                estadoId: editingTask.estadoId,
              }
            : undefined
        }
      />

      <table className="w-full mt-6 border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border-b border-gray-300">Descripción</th>
            <th className="p-2 border-b border-gray-300">Fecha</th>
            <th className="p-2 border-b border-gray-300">Categoría</th>
            <th className="p-2 border-b border-gray-300">Estado</th>
            <th className="p-2 border-b border-gray-300">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tareas.map((t) => (
            <tr key={t.id} className="hover:bg-gray-50">
              <td className="p-2 border-b border-gray-300">{t.descripcion}</td>
              <td className="p-2 border-b border-gray-300">{t.fechaAsignada}</td>
              <td className="p-2 border-b border-gray-300">
                {categorias.find((c) => c.id === t.categoriaId)?.nombre || ""}
              </td>
              <td className="p-2 border-b border-gray-300">
                {estados.find((e) => e.id === t.estadoId)?.nombre || ""}
              </td>
              <td className="p-2 border-b border-gray-300 space-x-2">
                <button
                  onClick={() => handleEdit(t)}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {tareas.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center p-4">
                No hay tareas para mostrar.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
