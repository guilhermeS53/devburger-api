import { v4 } from "uuid";
import User from "../models/User";
import * as Yup from "yup";

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ["id", "name", "email", "admin"],
      });
      return res.json(users);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Database error while fetching users" });
    }
  }
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      admin: Yup.boolean(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { name, email, password, admin } = req.body;

    try {
      const userExists = await User.findOne({
        where: {
          email,
        },
      });

      if (userExists) {
        return res.status(400).json({ error: "User already exists" });
      }
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Database error while checking if user exists" });
    }

    const user = await User.create({
      id: v4(),
      name,
      email,
      password,
      admin,
    });
    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }
}

export default new UserController();
