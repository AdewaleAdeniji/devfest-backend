import AttendeeService from "../services/AttendeeService";
import { WrapValidationHandler } from "../utils";
import { Request, Response } from "express";

export const RegisterController = WrapValidationHandler(
  async (req: Request, res: Response) => {
    const data = await AttendeeService.registerAttendee(req.body);
    const { success } = data;
    res.status(success ? 200 : 400).send(data);
  }
);

export const GetAttendeeByEmailController = WrapValidationHandler(
  async (req: Request, res: Response) => {
    const data = await AttendeeService.getAttendeeByEmail(req.body.email);
    res.status(data ? 200 : 400).send(data || {
        message: "User not found",
    });
  }
);
