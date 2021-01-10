import mongoose from "mongoose";
import { LocationModelFactory } from "../models/location/locationModelFactory";

interface ILocationResponse {
    id: string,
    title: string,
    description: string,
    address: string
}

interface ILocationRequest {
    title: string,
    description: string,
    address: string
}

interface ILocationDocument extends mongoose.Document {
    title: string,
    description: string,
    address: string
}

const _locationModelFactory = new LocationModelFactory();
const model = _locationModelFactory.Create();

class Location {
    constructor() { }

    public Create(attr: ILocationRequest): ILocationDocument {
        return new model(attr);
    }

    public async GetAll(): Promise<ILocationResponse[]> {
        const locations = await model.find({});
        const result: ILocationResponse[] = [];
        locations.forEach((location: ILocationDocument) => {
            const newlocation: ILocationResponse = {
                "id": location.id,
                "title": location.title,
                "description": location.description,
                "address": location.address,
            };
            result.push(newlocation);
        });
        return result;
    }

    public async Get(id: string): Promise<ILocationResponse> {
        const location = await model.findById(id);
        const result: ILocationResponse = {
            "id": location.id,
            "title": location.title,
            "description": location.description,
            "address": location.address
        };

        return result;
    }
}

export { Location };