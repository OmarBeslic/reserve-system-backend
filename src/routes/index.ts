import express from "express";
import authRoute from "./authRoutes";
const router = express.Router();

export default (): express.Router => {
  authRoute(router)
  return router;
};