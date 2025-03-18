import { stripe } from "../../../app";
import AppError from "../../errors/CustomAppError";
import { cardUtils } from "../../utils/cardUtils";
import UserModel from "../auth/auth.model";
import CardModel from "./card.model";


const saveCardToDB = async (payload, user) => {

    console.log(user, payload, "🐞🐞🐞🐞");

    if (!payload) {
        throw new AppError(400, "payment method is required");
    }


    const userData = await UserModel.findById({ _id: user?.id });

    if (!userData) {
        throw new AppError(400, "user not found");
    }


    const stripeCustomerId = await cardUtils.addOrGetStripCustomerAccount(
        user.id,
    );

    await stripe.paymentMethods.attach(payload?.paymentMethodId, {
        customer: stripeCustomerId,
    });

    const paymentMethod = await stripe.paymentMethods.retrieve(payload?.paymentMethodId);

    const cardData = {
        userId: user.id,
        paymentMethodId: payload?.paymentMethodId,
        brand: paymentMethod.card?.brand || "",
        last4: paymentMethod.card?.last4 || "",
        user: userData?._id
    };

    const card = await CardModel.create(cardData);

    return card;

};





const getCardsFromDB = async (userId: string) => {
    const result = await CardModel.find();

    if (!result) {
        throw new AppError(400, "no card available for this user");
    };

    return result;
};



export const cardService = {
    saveCardToDB,
    getCardsFromDB
};