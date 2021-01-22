import mongoose, {Schema, Document} from "mongoose";

export interface IRental extends Document {
    userId: string;
    movieId: string;
}

const RentalSchema: Schema = new Schema({
    userId: {type: String, required: true},
    movieId: {type: String, required: true},
});

// Export the model and return your IUser interface
export default mongoose.model<IRental>("Rental", RentalSchema);
