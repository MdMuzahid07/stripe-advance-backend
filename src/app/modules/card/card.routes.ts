import express from "express";
import { cardController } from "./card.controller";
import authValidation from "../../middlewares/authValidation";


const router = express.Router();


router.post(
    "/save-card",
    authValidation("user"),
    cardController.saveCard,
);



router.get(
    "/",
    authValidation("user"),
    cardController.getCards,
);



export const CardRoutes = router;