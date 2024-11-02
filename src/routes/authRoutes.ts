import express from "express";
import { login, register } from "../controllers/authController";
import { validateFields } from "../middlewares/validateFields";
import { createUser, loginUserSchema } from "../schemas/user.schema";

export default (router: express.Router) => {
  router.post('/register',validateFields(createUser), register);
  router.post('/login',validateFields(loginUserSchema), login);
};