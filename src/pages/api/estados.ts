import { NextApiRequest, NextApiResponse } from 'next';
import { Estado } from '../../../src/backend/models/Estado';
import { v4 as uuidv4 } from 'uuid';

let estados: Estado[] = [
  { id: '1', nombre: 'pendiente', createdAt: new Date(), updatedAt: new Date() },
  { id: '2', nombre: 'completado', createdAt: new Date(), updatedAt: new Date() },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(estados);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
