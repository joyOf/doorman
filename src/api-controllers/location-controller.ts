import express, { Request, Response } from "express";
import { Location } from "../domain/location";

const router = express.Router();
const location = new Location();

router.post("/api/locations", async (req: Request, res: Response) => {
    const newLocation = location.Create({ title: req.body.title, description: req.body.description, address: req.body.address });

    try {
        await newLocation.save();
    } catch (ex) {
        console.log(ex);
    }

    return res.status(200).send("here's the response baby");
});

router.get("/api/locations", async (req: Request, res: Response) => {
    const result = location.GetAll();
    result.then(result => {
        return res.status(200).send(result);
    });
});

router.get("/api/locations/:id", async (req: Request, res: Response) => {
    const result = location.Get(req.params.id);
    result.then(result => {
        return res.status(200).send(result);
    });
});

export { router as locationController };