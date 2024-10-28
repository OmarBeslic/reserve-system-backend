import { Request, Response } from 'express';
import { createUser, loginUser, logoutUser } from '../services/authService';

export const register = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

export const logout = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        await logoutUser(id);
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
};

