import { Sequelize } from "sequelize";

import User from "../app/models/User";
import Product from "../app/models/Product";
import Category from "../app/models/Category";

import configDatabase from "../config/database";

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(configDatabase);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
