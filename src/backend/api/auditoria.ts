import { NextApiRequest, NextApiResponse } from 'next';
import { Auditoria } from '../models/Auditoria';
import { v4 as uuidv4 } from 'uuid';

let auditorias: Auditoria[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { usuarioId } = req.query;
    let filteredAuditorias = auditorias;
    if (usuarioId) {
      filteredAuditorias = auditorias.filter(a => a.usuarioId === usuarioId);
    }
    return res.status(200).json(filteredAuditorias);
  } else if (req.method === 'POST') {
    const { usuarioId, accion, detalles } = req.body;
    const newAuditoria: Auditoria = {
      id: uuidv4(),
      usuarioId,
      accion,
      fecha: new Date(),
      detalles,
    };
    auditorias.push(newAuditoria);
    return res.status(201).json(newAuditoria);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
