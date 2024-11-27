import AttendeeModel from "../models/attendee";
import { AttendeeSignupPayload } from "../types";
import { generateID, generateRandomString } from "../utils";

class AttendeeService {
  static async registerAttendee(user: AttendeeSignupPayload) {
    const hasUserExisted = await AttendeeModel.findOne({
      attendeeEmail: user.attendeeEmail,
    });
    if (hasUserExisted) {
      return {
        success: false,
        message: "Email has already been used to register for this event",
      };
    }
    const newUser = new AttendeeModel(user);
    newUser.attendeeID = generateID("attendee");
    newUser.refferalCode = generateRandomString(6);
    const createUser = await AttendeeModel.create(newUser);
    if (createUser) {
      //update the refferal count of the user that referred this user
      if (user.referredBy) {
        const referredByUser = await AttendeeModel.findOne({
          refferalCode: user.referredBy,
        });
        if (referredByUser) {
          referredByUser.refferalCount =
            (referredByUser.refferalCount || 0) + 1;
          await referredByUser.save();
        }
      }
      return {
        success: true,
        message: "User has been created successfully",
        refferalCode: newUser.refferalCode,
      };
    }
    return {
      success: false,
      message: "User could not be created",
    };
  }

  static async getAttendeeByEmail(attendeeEmail: string) {
    const user = await AttendeeModel.findOne({ attendeeEmail });
    if (user) {
      const refferals = await AttendeeModel.find({
        referredBy: user.refferalCode,
      });
      const position = await this.getRefferalContestPosition(
        user.refferalCount || 0
      );
      return {
        firstName: user?.attendeeFirstName,
        lastName: user.attendeeLastName,
        refferals: refferals.length,
        position,
      };
    }
    return null;
  }

  static async getAllAttendees() {
    const users = await AttendeeModel.find();
    if (users) {
      return users;
    }
    return null;
  }

  static async getRefferalContestPosition(totalRefferals: number) {
    const refferals = await AttendeeModel.find({}).sort({ refferalCount: -1 });
    const position = refferals.findIndex(
      (attendee) => attendee.refferalCount === totalRefferals
    );
    return position + 1;
  }
}

export default AttendeeService;
