import mongoose from "mongoose";
import { locationSchema } from "./locationSchema";

interface ILocationDocument extends mongoose.Document {
    title: string,
    description: string,
    address: string
}

class LocationModelFactory {
    private _locationSchema = new mongoose.Schema(locationSchema);

    Create(): mongoose.Model<ILocationDocument> {
        return mongoose.model<ILocationDocument, mongoose.Model<ILocationDocument>>("Location", this._locationSchema);
    }
}

export { LocationModelFactory };