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

    // Check if user already exists
    const existingUser = await prismadb.client.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Generate salt and hash password
    const salt = random();
    const hashedPassword = hashPassword(salt, userData.password);

    // Create user with authentication
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

    // Return user without sensitive information
    const { authentication, ...userWithoutAuth } = user;
    return userWithoutAuth;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to create user: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while creating the user');
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await prismadb.client.findUnique({
      where: { email },
      include: { authentication: true }
    });

    if (!user || !user.authentication) {
      throw new Error('Invalid credentials');
    }

    const expectedHash = hashPassword(user.authentication.salt, password);
    if (expectedHash !== user.authentication.password) {
      throw new Error('Invalid credentials');
    }

    // Generate a new session token
    const sessionToken = random();

    // Update the user's session token
    await prismadb.authentication.update({
      where: { clientId: user.id },
      data: { sessionToken }
    });

    // Return user data and session token
    const { authentication, ...userWithoutAuth } = user;
    return { ...userWithoutAuth, sessionToken };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Login failed: ${error.message}`);
    }
    throw new Error('An unexpected error occurred during login');
  }
};

export const logoutUser = async (userId: string) => {
  try {
    await prismadb.authentication.update({
      where: { clientId: userId },
      data: { sessionToken: null }
    });
    return { message: 'Logged out successfully' };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Logout failed: ${error.message}`);
    }
    throw new Error('An unexpected error occurred during logout');
  }
};
