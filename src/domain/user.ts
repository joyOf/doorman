import mongoose from "mongoose";
import { UserModelFactory } from "../models/user/userModelFactory";

interface IUser {
    locationId: string,
    firstName: string,
    lastName: string
}

interface IUserDocument extends mongoose.Document {
    locationId: string,
    firstName: string,
    lastName: string
}

const _userModelFactory = new UserModelFactory();
const model = _userModelFactory.Create();

class User {
    constructor() { }

    public Create(attr: IUser): IUserDocument {
        const user = new model(attr);
        return user;
    }

    public async GetAll(): Promise<IUserDocument[]> {
        const result = await model.find({});
        return result;
    }

    public async Get(id: string): Promise<IUserDocument> {
        return await model.findById(id);
    }
}

export { User };