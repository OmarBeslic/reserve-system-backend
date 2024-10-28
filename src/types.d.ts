
declare global {
  type User = {
    id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    authentication?: {
      id: string;
      password: string;
      salt: string;
      sessionToken: string | null;
    };
  };

  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export {};