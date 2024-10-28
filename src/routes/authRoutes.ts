import express from "express";
import { register } from "../controllers/authController";
import { validateFields } from "../middlewares/validateFields";
import { createUser } from "../schemas/user.schema";

export default (router: express.Router) => {
  router.post('/register',validateFields(createUser), register);
      
};