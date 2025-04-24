import * as Yup from "yup";
import Category from "../models/Category";
import User from "../models/User";

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

    const { admin: isAdmin } = await User.findByPk(req.userId);

    if (!isAdmin) {
      return res.status(401).json({ error: "User isn't admin" });
    }

    const { filename: path } = req.file;

    const { name } = req.body;

    const categoryExists = await Category.findOne({
      where: { name },
    });

    if (categoryExists) {
      return res.status(400).json({ error: "Category already exists" });
    }

    const { id } = await Category.create({
      name,
      path,
    });
    return res.status(201).json({ id, name });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }

    const { admin: isAdmin } = await User.findByPk(req.userId);

    if (!isAdmin) {
      return res.status(401).json({ error: "User isn't admin" });
    }

    const { id } = req.params;

    const categoryExists = await Category.findByPk(id);

    if (!categoryExists) {
      return res.status(400).json({ message: "Category not found" });
    }

    let path;
    if (req.file) {
      path = req.file.filename;
    }

    const { name } = req.body;

    if (name) {
      const categoryNameExists = await Category.findOne({
        where: { name },
      });

      if (categoryNameExists && categoryNameExists.id !== +id) {
        return res.status(400).json({ error: "Category already exists" });
      }
    }

    await Category.update(
      { name, path },
      {
        where: { id },
      }
    );
  }

  async index(req, res) {
    const categories = await Category.findAll();
    return res.json(categories);
  }
}

export default new CategoryController();
