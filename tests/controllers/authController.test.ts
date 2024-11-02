// authController.test.ts
import { Request, Response } from 'express';
import { register } from '../../src/controllers/authController';
import { createUser, getUser } from '../../src/services/authService';

jest.mock('../../src/services/authService');

describe('AuthController - Register', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock }));

    req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        phone: '1234567890',
        role: 'CLIENT',
      },
    };

    res = {
      status: statusMock,
    };
  });

  it('should create a new user and return 201 status', async () => {
    (getUser as jest.Mock).mockResolvedValue(null);
    (createUser as jest.Mock).mockResolvedValue({ id: 1, email: 'test@example.com' });

    await register(req as Request, res as Response);

    expect(getUser).toHaveBeenCalledWith('test@example.com');
    expect(createUser).toHaveBeenCalledWith(req.body);
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({
      message: 'User created successfully',
      user: { id: 1, email: 'test@example.com' },
    });
  });

  it('should return 400 status if user already exists', async () => {
    (getUser as jest.Mock).mockResolvedValue({ id: 1, email: 'test@example.com' });

    await register(req as Request, res as Response);

    expect(getUser).toHaveBeenCalledWith('test@example.com');
    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ error: 'user_exists' });
  });

  it('should return 500 status if an unexpected error occurs', async () => {
    (getUser as jest.Mock).mockRejectedValue(new Error('Unexpected error'));

    await register(req as Request, res as Response);

    expect(getUser).toHaveBeenCalledWith('test@example.com');
    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ error: 'Unexpected error' });
  });
  
  it('should return 500 if a non-Error object is thrown', async () => {
    (getUser as jest.Mock).mockRejectedValue('Unexpected error');

    await register(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ error: 'An unexpected error occurred' });
  });
});