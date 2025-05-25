"use client";

import React, { useState, useEffect } from "react";

interface TaskFormProps {
  onSave: (task: {
    descripcion: string;
    fechaAsignada: string;
    categoriaId: string;
    estadoId: string;
  }) => void;
  categorias: { id: string; nombre: string }[];
  estados: { id: string; nombre: string }[];
  initialData?: {
    descripcion: string;
    fechaAsignada: string;
    categoriaId: string;
    estadoId: string;
  };
}

export default function TaskForm({
  onSave,
  categorias,
  estados,
  initialData,
}: TaskFormProps) {
  const [descripcion, setDescripcion] = useState(initialData?.descripcion || "");
  const [fechaAsignada, setFechaAsignada] = useState(
    initialData?.fechaAsignada || ""
  );
  const [categoriaId, setCategoriaId] = useState(
    initialData?.categoriaId || (categorias.length > 0 ? categorias[0].id : "")
  );
  const [estadoId, setEstadoId] = useState(
    initialData?.estadoId || (estados.length > 0 ? estados[0].id : "")
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ descripcion, fechaAsignada, categoriaId, estadoId });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block mb-1 font-semibold">Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Fecha Asignada</label>
        <input
          type="date"
          value={fechaAsignada}
          onChange={(e) => setFechaAsignada(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Categoría</label>
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-semibold">Estado</label>
        <select
          value={estadoId}
          onChange={(e) => setEstadoId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          {estados.map((est) => (
            <option key={est.id} value={est.id}>
              {est.nombre}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
      >
        Guardar
      </button>
    </form>
  );
}
