import { stripe } from "../../../app";
import AppError from "../../errors/CustomAppError";
import UserModel from "../auth/auth.model";


const saveCardToDB = async (payload) => {

    // console.log(user, payload, "🐞🐞🐞🐞");

    if (!payload) {
        throw new AppError(400, "payment method is required");
    }


    const userData = await UserModel.findById({ _id: payload?.userId });

    if (!userData) {
        throw new AppError(400, "user not found");
    }




};



export const cardService = {
    saveCardToDB
};