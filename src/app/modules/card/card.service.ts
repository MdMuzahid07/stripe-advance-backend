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



    const stripeCustomerId = await userUtils.createOrFetchStripeCustomer(
        user.id,
        user.email
    );

    await stripe.paymentMethods.attach(payload?.paymentMethodId, {
        customer: stripeCustomerId,
    });

    const paymentMethod = await stripe.paymentMethods.retrieve(payload?.paymentMethodId);



    const data = {
        userId: payload?.userId,
        paymentMethodId: payload?.paymentMethodId,
        brand: paymentMethod.card?.brand || "",
        last4: paymentMethod.card?.last4 || "",
    };









};



export const cardService = {
    saveCardToDB
};