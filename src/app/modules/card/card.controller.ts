import { Request, Response } from "express";
import sendResponse from "../../utils/send.response";
import httpStatus from "http-status";
import { cardService } from "./card.service";
import catchAsync from "../../utils/tryCatchAsync";



const saveCard = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const card = await cardService.saveCardToDB(req.body, user);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "card saved successfully",
        data: card,
    });
});



const getCards = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const card = await cardService.getCardsFromDB(user?.id);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "card retrieved successfully",
        data: card,
    });
});




export const cardController = {
    saveCard,
    getCards
};
