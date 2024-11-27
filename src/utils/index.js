import { validationResult } from "express-validator";
import { v4 as uuidv4 } from 'uuid';
import { config } from "../configs";

export const WrapHandler = (controllerFn) => {
  return async (req, res, next) => {
    try {
      await controllerFn(req, res, next);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  };
};
export const getAPIExpiryTimestamp = (subscriptionExpiryDate) => {
    // Get the current date
    const currentDate = new Date();
  if(!subscriptionExpiryDate) {
      return { active: false, expiryDate: currentDate, expired: true };
  }
  // Get the default expiry days from the config
  const defaultAPIExpiryDays = config.app.EXPIRY_DAYS;



  // Parse the subscription expiry date
  const parsedSubscriptionExpiryDate = new Date(subscriptionExpiryDate);

  // Check if the subscription expiry date has passed the current date
  if (parsedSubscriptionExpiryDate < currentDate) {
      return { active: false, expiryDate: parsedSubscriptionExpiryDate };
  }

  // Calculate the default expiry date by adding the default expiry days to the current date
  const expiryDate = new Date(currentDate.getTime() + defaultAPIExpiryDays * 24 * 60 * 60 * 1000);

  // Compare the calculated expiry date with the subscription expiry date
  if (expiryDate > parsedSubscriptionExpiryDate) {
      return { active: true, expiryDate: parsedSubscriptionExpiryDate };
  } else {
      return { active: true, expiryDate: expiryDate };
  }
};

export const WrapValidationHandler = (controllerFn) => {
  return async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = errors.array();
        return res.status(400).json({ error: error[0].msg || "Validation failed" });
      }
      await controllerFn(req, res, next);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  };
};
export const generateID = (prefix = "") => {
  const timestamp = new Date().getTime().toString(); // get current timestamp as string
  const random = Math.random().toString().substr(2, 5); // generate a random string of length 5
  const userId = timestamp + random; // concatenate the timestamp and random strings
  return prefix + generateRandomString(7) + userId + generateRandomString(5);
};
export const generateRandomString = (length = 7) => {
  const uuid =  uuidv4();
  return uuid.substr(0, length);
};
export function secondsUntil(dateString) {
  // Parse the input date string into a Date object
  const targetDate = new Date(dateString);
  
  // Get the current date and time
  const currentDate = new Date();
  
  // Calculate the difference in milliseconds
  const differenceInMilliseconds = targetDate - currentDate;
  
  // Convert milliseconds to seconds
  const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
  
  return differenceInSeconds;
}