import mongoose from "mongoose";
import { LocationModelFactory } from "../models/location/locationModelFactory";

interface ILocation {
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

    public Create(attr: ILocation): ILocationDocument {
        return new model(attr);
    }

    public async GetAll(): Promise<ILocationDocument[]> {
        const result = await model.find({});
        return result;
    }

    public async Get(id: string): Promise<ILocationDocument> {
        return await model.findById(id);
    }
}

export { Location };