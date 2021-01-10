import express, { Request, Response } from "express";
import { User } from "../domain/user";

const router = express.Router();
const user = new User();

router.post("/api/users", async (req: Request, res: Response) => {
    const newUser = user.Create({ locationId: req.body.locationId, firstName: req.body.firstName, lastName: req.body.lastName });

    try {
        await newUser.save();
        return res.status(200).send(`user with firstName ${req.body.firstName} was created`);
    } catch (ex) {
        console.log(ex);
        return res.status(500);
    }

});

router.get("/api/users", async (req: Request, res: Response) => {
    const result = await user.GetAll();
    return res.status(200).send(result);
});

router.get("/api/users/:Id", async (req: Request, res: Response) => {
    const result = await user.Get(req.params.Id);
    return res.status(200).send(result);
});

export { router as userController };