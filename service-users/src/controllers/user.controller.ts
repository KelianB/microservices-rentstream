import User, {IUser} from "../models/user.model";
import {CreateQuery} from "mongoose";

export async function createUser({email, firstName, lastName, dateOfBirth}: CreateQuery<IUser>): Promise<IUser> {
    return User.create({
        email,
        firstName,
        lastName,
        dateOfBirth,
    })
        .then((data: IUser) => {
            return data;
        })
        .catch((error: Error) => {
            throw error;
        });
}
