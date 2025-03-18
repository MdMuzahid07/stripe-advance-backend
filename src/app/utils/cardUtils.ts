import { stripe } from "../../app";
import AppError from "../errors/CustomAppError";
import UserModel from "../modules/auth/auth.model";

const addOrGetStripCustomerAccount = async (userId: string,) => {
    // ============= find the user by ID ==================>
    const userData = await UserModel.findById(userId);

    if (!userData) {
        throw new AppError(400, "User not found");
    }
    if (!userData.stripeCustomerId) {
        const customer = await stripe.customers.create({ email: userData?.email });

        await UserModel.findByIdAndUpdate(userId, { stripeCustomerId: customer.id }, { new: true });

        return customer.id;
    }

    return userData.stripeCustomerId;
};

export const cardUtils = {
    addOrGetStripCustomerAccount
};

