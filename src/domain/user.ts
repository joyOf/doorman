import mongoose from "mongoose";
import { UserModelFactory } from "../models/user/userModelFactory";

interface IUserResponse {
    id: string,
    locationId: string,
    firstName: string,
    lastName: string
}

interface IUserRequest {
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

    public Create(attr: IUserRequest): IUserDocument {
        return new model(attr);
    }

    public async GetAll(): Promise<IUserResponse[]> {
        const users = await model.find({});
        const result: IUserResponse[] = [];
        users.forEach((user: IUserDocument) => {
            const newUser: IUserResponse = {
                "id": user.id,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "locationId": user.locationId,
            };
            result.push(newUser);
        });
        return result;
    }

    public async Get(id: string): Promise<IUserResponse> {
        const user = await model.findById(id);
        const result: IUserResponse = {
            "id": user.id,
            "locationId": user.locationId,
            "firstName": user.firstName,
            "lastName": user.lastName
        };

        return result;
    }
}

export { IUserResponse as IUser, User };