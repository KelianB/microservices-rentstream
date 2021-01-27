import Rental, {IRental} from "../models/rental.model";
import {CreateQuery, FilterQuery} from "mongoose";

export async function createRental({userId, movieId, date}: CreateQuery<IRental>): Promise<IRental> {
    return Rental.create({userId, movieId, date})
        .then((data: IRental) => data)
        .catch((error: Error) => {
            throw error;
        });
}

export async function getRentals({userId}: FilterQuery<IRental>): Promise<IRental[]> {
    return Rental.find({userId})
        .then((data: IRental[]) => data)
        .catch((error: Error) => {
            throw error;
        });
}
