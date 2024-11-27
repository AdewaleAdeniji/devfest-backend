import jwt from "jsonwebtoken";
import { config } from "../configs";

export const APITokenMiddleware = async (req: any, res: any, next: any) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }
  // cut the token from the string
  const tokenString = token.split(" ")[1];
  // verify token
  const decodedData = await verifyToken(tokenString);
  // if token is valid, call next
  if (!decodedData) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  req.data = decodedData;
  return next();
};
export const generateToken = async (serviceID: string) => {
  console.log(config.jwt)
  const token = jwt.sign(
    {
      serviceID
    },
    config.jwt.JWT_SECRET_KEY);
  return token;
};
export const verifyToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, config.jwt.JWT_SECRET_KEY);
    return decoded;
  } catch (e) {
    return null;
  }
};
