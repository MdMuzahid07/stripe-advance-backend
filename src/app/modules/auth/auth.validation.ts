import { z } from "zod";

const UserValidationSchema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().optional(),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});



const LoginValidation = z.object({
    email: z.string(),
    password: z.string(),
});

export const AuthValidation = {
    UserValidationSchema,
    LoginValidation
};