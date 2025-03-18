import { stripe } from "../../../app";
import AppError from "../../errors/CustomAppError";
import { cardUtils } from "../../utils/cardUtils";
import UserModel from "../auth/auth.model";
import CardModel from "../card/card.model";
// Import your Mongoose Balance model

const addDeposit = async (amount, saveCardId, user) => {
    const amountInCents = amount * 100;
    // Get or create Stripe customer ID
    const customerId = await cardUtils.addOrGetStripCustomerAccount(user.id);

    const isCardExist = await CardModel.find({
        _id: saveCardId,
        userId: user.id,
    });

    console.log(isCardExist, "isCardExist ===================");

    if (!isCardExist) {
        throw new AppError(404, "Card not found");
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "usd",
        customer: customerId,
        payment_method: isCardExist?.paymentMethodId,
        off_session: true,
        confirm: true,
    });

    await UserModel.findOneAndUpdate(
        { userId: user.id },
        { $inc: { amount_cents: amountInCents } },
        { new: true, upsert: true }
    );

    return paymentIntent;
};


export const depositService = {
    addDeposit,
};