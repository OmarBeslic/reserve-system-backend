import { Request, Response } from 'express';
import { createUser, getUser } from '../services/authService';

export const register = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const existingUser = await getUser(userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    const user = await createUser(userData);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

