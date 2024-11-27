import { body } from "express-validator";

export const loginValidator = [
  body("email", "Email cannot be Empty").not().isEmpty(),
  body("email", "Invalid email").isEmail(),
  body("password", "The minimum password length is 8 characters").isLength({
    min: 8,
  }),
];

export const attendeeSignupValidator = [
  body("attendeeEmail", "Email cannot be Empty").not().isEmpty(),
  body("attendeeEmail", "Invalid email").isEmail(),
  body("attendeeFirstName", "First name cannot be Empty").not().isEmpty(),
  body("attendeeLastName", "Last name cannot be Empty").not().isEmpty(),
  body("attendeeFirstName", "Firstname is invalid").isLength({
    min: 3,
  }),
  body("attendeeLastName", "Lastname is invalid").isLength({
    min: 3,
  }),
];


export const emailLoginValidator = [
  body("email", "Email cannot be Empty").not().isEmpty(),
  body("email", "Invalid email").isEmail(),
];
export const signupValidator = [
  body("email", "Email cannot be Empty").not().isEmpty(),
  body("email", "Invalid email").isEmail(),
];
export const OTPValidator = [
  body("email", "Email cannot be Empty").not().isEmpty(),
  body("email", "Invalid email").isEmail(),
  body("otp", "The otp code length is 6 characters").isLength({
    min: 6,
  }),
];
export const passwordOTPValidator = [
  body("email", "Email cannot be Empty").not().isEmpty(),
  body("email", "Invalid email").isEmail(),
  body("otp", "The otp code length is 6 characters").isLength({
    min: 6,
  }),
  body("password", "The minimum password length is 8 characters").isLength({
    min: 8,
  }),
];
export const passwordChangeValidator = [
  body("oldPassword", "old password length is 8 characters").isLength({
    min: 8,
  }),
  body("newPassword", "The minimum password length is 8 characters").isLength({
    min: 8,
  }),
];
export const nameChangeValidator = [
  body("firstName", "First name cannot be Empty").not().isEmpty(),
  body("lastName", "Last name cannot be Empty").not().isEmpty(),
  body("firstName", "Firstname is invalid").isLength({
    min: 3,
  }),
  body("lastName", "Lastname is invalid").isLength({
    min: 3,
  }),
];
