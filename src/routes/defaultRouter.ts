import { Router } from "express";


const defaultRouter = Router();

defaultRouter.post("/setup", (req: any, res: any) => {
    res.send("Setup");
})


export default defaultRouter;