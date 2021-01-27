import mongoose, {Schema, Document} from "mongoose";

export interface IRental extends Document {
    userId: string;
    movieId: string;
    date: Date;
}

const RentalSchema: Schema = new Schema({
    userId: {type: String, required: true},
    movieId: {type: String, required: true},
    date: {type: Date, default: () => new Date()},
});

export default mongoose.model<IRental>("Rental", RentalSchema);
