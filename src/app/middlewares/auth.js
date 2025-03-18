import { spliceStr } from "sequelize/lib/utils";
import jwt from "jsonwebtoken";
import authConfig from "../../config/auth";

function authMiddleware(req, res, next) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authToken.split(" ")[1];

  try {
    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) {
        throw new Error();
      }

      req.userId = decoded.id;

      return next();
    });
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

export default authMiddleware;
