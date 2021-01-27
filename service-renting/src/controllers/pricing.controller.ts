import {CreateQuery, FilterQuery} from "mongoose";
import Pricing, {IPricing} from "../models/pricing.model";

export async function setPricing({movieId, priceHistory}: CreateQuery<IPricing>): Promise<IPricing> {
    return Pricing.findOneAndUpdate(
        {movieId},
        {movieId, priceHistory},
        {
            upsert: true, // create if doesn't exist
            new: true, // return document after update
            lean: true, // return only the document
        },
    )
        .then((data: IPricing) => data)
        .catch((error: Error) => {
            throw error;
        });
}

export async function setNewPrice({movieId, price}: {movieId: string; price: number}): Promise<IPricing> {
    const pricing = (await Pricing.findOne({movieId}).exec()) as IPricing | null;
    if (pricing) {
        return setPricing({movieId, priceHistory: [price].concat(pricing.priceHistory)});
    } else {
        return setPricing({movieId, priceHistory: [price]});
    }
}

export async function getPricing({movieId}: FilterQuery<IPricing>): Promise<IPricing> {
    return Pricing.findOne({movieId})
        .then((data: IPricing) => data)
        .catch((error: Error) => {
            throw error;
        });
}
