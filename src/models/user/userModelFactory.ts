import mongoose from "mongoose";
import { userSchema } from "../user/userSchema";

interface IUserDocument extends mongoose.Document {
    locationId: string,
    firstName: string,
    lastName: string
}

class UserModelFactory {
    private _userSchema = new mongoose.Schema(userSchema);

    Create(): mongoose.Model<IUserDocument> {
        return mongoose.model<IUserDocument, mongoose.Model<IUserDocument>>("User", this._userSchema);
    }
}

export { UserModelFactory };