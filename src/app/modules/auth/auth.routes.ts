import express from "express";
import requestValidator from "../../middlewares/requestValidator";
import { AuthController } from "./auth.controller";
import { AuthValidationZod } from "./auth.validation";

const router = express.Router();


router.post(
    "/signup",
    requestValidator(AuthValidationZod.UserValidationSchema),
    AuthController.createUser,
);

router.post(
    "/login",
    requestValidator(AuthValidationZod.LoginValidation),
    AuthController.LoginUser,
);


export const AuthRoutes = router;