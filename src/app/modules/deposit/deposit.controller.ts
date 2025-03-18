import httpStatus from "http-status";
import catchAsync from "../../utils/tryCatchAsync";
import sendResponse from "../../utils/send.response";
import { depositService } from "./deposit.service";

const addDeposit = catchAsync(async (req, res) => {
    const { amount, saveCardId } = req.body;
    const user = req.user!;


    const card = await depositService.addDeposit(amount, saveCardId, user);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "card retrieved successfully",
        data: {
            paymentIntentId: card.id,
            status: card.status,
        },
    });
});

export const depositController = {
    addDeposit
};