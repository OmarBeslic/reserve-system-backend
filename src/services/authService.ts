import bcrypt from "bcrypt";
import { Role } from "@prisma/client";
import prismadb from "../utils/db.server";
import { getPermissionsForRole } from "../helpers/permissionHelper";

interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: Role;
}
interface LoginData {
  email: string;
  password: string;
}

export const createUser = async (userData: RegisterData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  try {
    const role = userData.role || Role.CLIENT;
    const permissions = await getPermissionsForRole(role);
    const user = await prismadb.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        password: hashedPassword,
        role: role,
        permissions: {
          connect: permissions,
        },

      },
    });

    return user
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to create user: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while creating the user');
  }
};


export const loginUser= async(loginData:LoginData)=>{
  try {
    const user = await getUser(loginData.email);
    return user;
  } catch (error) {
    if(error instanceof Error){
      throw new Error(`Unable to login: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while logging in");
  }
}

export const getUser = async (email: string) => {
  try {
    const user = await prismadb.user.findUnique({ where: { email:email} });
    return user;
  } catch (error) {
    if(error instanceof Error){
      throw new Error(`Unable to get user: ${error.message}`);
    }
    throw new Error("An unexpected error occurred");
  }
};