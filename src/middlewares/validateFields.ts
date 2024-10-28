import { RequestHandler } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validateFields = (schema: AnyZodObject): RequestHandler => 
  async (req, res, next): Promise<void> => {
    try {
      await schema.parseAsync(
        req.body,
      );
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          status: 'validation_error',
          message: 'Validation failed',
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
        return;
      }
      
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
      return;
    }
  };