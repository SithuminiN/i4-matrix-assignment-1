import { Router } from "express";
import * as controller from "../controllers/employee.controller";
import { validateObjectId } from "../middleware/validateObjectId";
import { validateCreate, validateUpdate } from "../middleware/validateEmployee";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", validateObjectId, controller.getOne);
router.post("/", validateCreate, controller.create);
router.put("/:id", validateObjectId, validateUpdate, controller.update);
router.patch("/:id", validateObjectId, validateUpdate, controller.update);
router.delete("/:id", validateObjectId, controller.remove);

export default router;
