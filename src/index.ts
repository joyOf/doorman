import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";

import { locationController } from "./api-controllers/location-controller";
import { userController } from "./api-controllers/user-controller";

mongoose.connect("mongodb://localhost:27017/locations", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("connected to database");
});


const app = express();
app.use(json());

app.use(locationController);
app.use(userController);

app.listen(3000, () => {
    console.log("server is listening on port 3000");
});