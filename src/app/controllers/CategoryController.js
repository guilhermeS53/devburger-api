import * as Yup from "yup";
import Category from "../models/Category";

class CategoryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }

    const { name } = req.body;

    const category = await Category.create({
      name,
    });
    return res.status(201).json(category);
  }

  async index(req, res) {
    const categories = await Category.findAll();
    return res.json(categories);
  }
}

export default new CategoryController();
