import express from "express";
import { cardController } from "./card.controller";


const router = express.Router();


router.post(
    "/save-card",
    cardController.saveCard,
);



export const CardRoutes = router;