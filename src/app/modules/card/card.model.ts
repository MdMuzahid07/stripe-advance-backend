import mongoose, { Schema } from "mongoose";


const savedCardSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    paymentMethodId: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    last4: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},
    {
        timestamps: true,
    }
);

const CardModel = mongoose.model("Card", savedCardSchema);


export default CardModel;