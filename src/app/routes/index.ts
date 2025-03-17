import express from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { CardRoutes } from "../modules/card/card.routes";



const router = express.Router();


const moduleRoutes = [
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/card",
        route: CardRoutes
    }
];


moduleRoutes.forEach((route) => router.use(route.path, route.route));


export default router;