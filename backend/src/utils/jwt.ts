import jwt from "jsonwebtoken";
import config from "../config/config";

interface TokenPayload {
  id: number;
}

export const generateToken = (payload: TokenPayload) => {
  return jwt.sign(payload, config.get("jwtSecret"), {
    expiresIn: "1d",
  });
};

export const verifyToken = (
  token: string
): TokenPayload & {
  iat: number;
  exp: number;
} => {
  return jwt.verify(token, config.get("jwtSecret")) as TokenPayload & {
    iat: number;
    exp: number;
  };
};
