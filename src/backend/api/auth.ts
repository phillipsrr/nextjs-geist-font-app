import { NextApiRequest, NextApiResponse } from 'next';
import { Usuario } from '../models/Usuario';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

let usuarios: Usuario[] = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password, fullName, action } = req.body;

    if (action === 'register') {
      if (usuarios.find(u => u.username === username)) {
        return res.status(400).json({ error: 'Username already exists' });
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser: Usuario = {
        id: uuidv4(),
        username,
        passwordHash,
        fullName,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      usuarios.push(newUser);
      return res.status(201).json({ message: 'User registered successfully' });
    } else if (action === 'login') {
      const user = usuarios.find(u => u.username === username);
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      const passwordMatch = await bcrypt.compare(password, user.passwordHash);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      // For simplicity, return user info without token
      return res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.username, fullName: user.fullName } });
    } else {
      return res.status(400).json({ error: 'Invalid action' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
