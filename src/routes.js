import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import ProductController from "./app/controllers/ProductController";
import CategoryController from "./app/controllers/CategoryController";
import authMiddleware from "./app/middlewares/auth";
import OrderController from "./app/controllers/OrderController";

const router = Router();

const upload = multer(multerConfig);

router.get("/users", UserController.index);
router.post("/users", UserController.store);
router.post("/session", SessionController.store);

router.use(authMiddleware);
router.post("/products", upload.single("file"), ProductController.store);
router.get("/products", ProductController.index);

router.post("/categories", CategoryController.store);
router.get("/categories", CategoryController.index);

router.post("/orders", OrderController.store);

export default router;
