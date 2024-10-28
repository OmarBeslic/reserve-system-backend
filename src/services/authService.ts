import prismadb from "../utils/db.server";
import { random, hashPassword } from "../helpers";

interface UserDataInterface {
  email: string;
  password: string;
  name: string;
  phone: string;
}

export const createUser = async (userData: UserDataInterface) => {
  try {

    const salt = random();
    const hashedPassword = hashPassword(salt, userData.password);

    const user = await prismadb.client.create({
      data: {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        authentication: {
          create: {
            password: hashedPassword,
            salt: salt,
          }
        }
      },
      include: {
        authentication: true
      }
    });

    const { authentication, ...userWithoutAuth } = user;
    return userWithoutAuth;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to create user: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while creating the user');
  }
};

export const getUser = async (email: string) => {
  const user = await prismadb.client.findUnique({ where: { email } });
  return user;
};

