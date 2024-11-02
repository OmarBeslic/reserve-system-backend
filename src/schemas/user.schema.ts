import { minLengthMessage } from "../helpers";
import { z } from "zod";

export const createUser = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(9),
  password: z.string()
    .min(8, minLengthMessage(8))
    .regex(/^(?=.*[0-9])/,"must_contain_number")
    .regex(/^(?=.*[a-z])/, "Password must contain at least one lowercase letter")
    .regex(/^(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .regex(/^(?=.*[!@#$%^&*])/, "Password must contain at least one special character")
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string()
  .min(8, minLengthMessage(8))
  .regex(/^(?=.*[0-9])/,"must_contain_number")
  .regex(/^(?=.*[a-z])/, "Password must contain at least one lowercase letter")
  .regex(/^(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
  .regex(/^(?=.*[!@#$%^&*])/, "Password must contain at least one special character")
})

export type CreateUserInput = z.infer<typeof createUser>;
