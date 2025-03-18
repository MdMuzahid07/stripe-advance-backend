import express from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { CardRoutes } from "../modules/card/card.routes";
import { DepositRoutes } from "../modules/deposit/deposit.routes";



const router = express.Router();


const moduleRoutes = [
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/card",
        route: CardRoutes
    },
    {
        path: "/deposit",
        route: DepositRoutes
    }
];


moduleRoutes.forEach((route) => router.use(route.path, route.route));


export default router;