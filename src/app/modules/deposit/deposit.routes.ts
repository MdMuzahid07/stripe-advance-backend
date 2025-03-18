import express from "express";
import authValidation from "../../middlewares/authValidation";
import { depositController } from "./deposit.controller";


const router = express.Router();


router.post(
    "/add-deposit",
    authValidation("user"),
    depositController.addDeposit,
);



export const DepositRoutes = router;