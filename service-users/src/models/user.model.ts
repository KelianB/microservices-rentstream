import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
}

const UserSchema: Schema = new Schema({
    email: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    dateOfBirth: {type: Date, required: true},
    /*// Gets the Mongoose enum from the TypeScript enum
    gender: {type: String, enum: Object.values(Gender)},*/
});

// Export the model and return your IUser interface
export default mongoose.model<IUser>("User", UserSchema);
