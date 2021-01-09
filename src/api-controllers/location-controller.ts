import express, { Request, Response } from "express";
import { Location } from "../domain/location";
import qrCode from "qrcode";
import path from "path";
import fs from "fs";

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

router.get("/api/locations/:id/qr-code-url", async (req: Request, res: Response) => {
    const visitFormUrl = `localhost:3000/api/locations/${req.body.id}/`;
    const parentDirname = path.dirname(__dirname);
    const qrCodeRepresentationUri = await qrCode.toDataURL(visitFormUrl);

    fs.writeFileSync(`${parentDirname}/views/qr-code.html`, `<img src="${qrCodeRepresentationUri}">`);

    return res.status(200).sendFile(path.join(parentDirname + "/views/qr-code.html"));
});

router.get("/api/locations/:locationId/visit", async (req: Request, res: Response) => {
    const result = location.GetAll();
    result.then(result => {
        return res.status(200).send(result);
    });
});

export { router as locationController };