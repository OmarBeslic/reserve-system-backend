import express from "express";
import { login, logout, register } from "../controllers/authController";
import { validateFields } from "../middlewares/validateFields";
import { createUser } from "../schemas/user.schema";

export default (router: express.Router) => {
  router.post('/register',validateFields(createUser), register);
  router.post('/login', login);
  router.post('/logout', logout);
};