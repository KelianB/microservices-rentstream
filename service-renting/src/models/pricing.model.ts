import mongoose, {Schema, Document} from "mongoose";

export interface IPricing extends Document {
    movieId: string;
    priceHistory: number[];
}

const PricingSchema: Schema = new Schema({
    movieId: {type: String, required: true},
    priceHistory: {type: [Number], required: true},
});

export default mongoose.model<IPricing>("Pricing", PricingSchema);
