import express, { Request, Response } from "express";
import { Location } from "../domain/location";
import qrCode from "qrcode";
import path from "path";
import fs from "fs";
import { IUser, User } from "../domain/user";
import amqp from "amqplib/callback_api";

const router = express.Router();
const location = new Location();
const userRepository = new User();

router.post("/api/locations", async (req: Request, res: Response) => {
    const newLocation = location.Create({
        title: req.body.title,
        description: req.body.description,
        address: req.body.address
    });

    try {
        await newLocation.save();
    } catch (ex) {
        console.log(ex);
    }

    return res.status(200).send("here's the response baby");
});

router.get("/api/locations", async (req: Request, res: Response) => {
    const result = await location.GetAll();
    return res.status(200).send(result);
});

router.get("/api/locations/:id", async (req: Request, res: Response) => {
    const result = await location.Get(req.params.id);
    return res.status(200).send(result);
});

router.get("/api/locations/:id/qr-code", async (req: Request, res: Response) => {
    const visitFormUrl = `localhost:3000/api/locations/${req.params.id}/visit`;
    const parentDirname = path.dirname(__dirname);
    const qrCodeRepresentationUri = await qrCode.toDataURL(visitFormUrl);

    fs.writeFileSync(`${parentDirname}/views/qr-code/qr-code.html`, `<img src="${qrCodeRepresentationUri}">`);

    return res.status(200).sendFile(path.join(parentDirname + "/views/qr-code/qr-code.html"));
});

// get users by locationId for a visit
// todo: return html with visit
router.get("/api/locations/:id/visit", async (req: Request, res: Response) => {

    try {
        const users = await userRepository.GetAll();
        const usersOnLocation: IUser[] = [];
        users.forEach(user => {
            if (user.locationId === req.params.id) {
                usersOnLocation.push(user);
            }
        });

        return res.status(200).send(users);
    } catch (ex) {
        console.log(ex);
    }
    return res.status(500);
});

// create a visit
router.post("/api/locations/:locationId/users/:userId", async (req: Request, res: Response) => {
    try {
        amqp.connect("amqp://localhost", (error0, connection) => {
            if (error0) {
                throw error0;
            }
            connection.createChannel((error1, channel) => {
                if (error1) {
                    throw error1;
                }
                const queue = "visit";
                // todo: create interface
                const message = [{
                    type: "VisitCreated",
                    locationId: req.params.locationId,
                    userId: req.params.userId
                }];

                channel.assertQueue(queue, {
                    durable: false
                });

                channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
                console.log(" [x] Sent %s", message);

                setTimeout(() => {
                    connection.close();
                    process.exit(0);
                }, 500);
            });
        });

        return res.status(200);
    } catch (ex) {
        console.log(ex);
        return res.status(500);
    }
});

export { router as locationController };