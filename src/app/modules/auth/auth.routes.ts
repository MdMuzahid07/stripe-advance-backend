import express from "express";
import requestValidator from "../../middlewares/requestValidator";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";

const router = express.Router();


router.post(
    "/signup",
    requestValidator(AuthValidation.UserValidationSchema),
    AuthController.createUser,
);

router.post(
    "/login",
    requestValidator(AuthValidation.LoginValidation),
    AuthController.LoginUser,
);


export const AuthRoutes = router;