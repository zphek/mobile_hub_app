import { Router } from "express"
import multer from "multer";
import path from "path";
import { authMiddleware } from "./middleware";
import PhoneController from "../controllers/Phone.controller";
const router = Router();

const storage = multer.diskStorage({
  destination: "./uploads/phonesPhotos",
  filename: function (req: any, file:any, cb:any) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Nombre del archivo con extensión
  }
});

const upload = multer({ storage: storage });

router
  .post("/create", authMiddleware, upload.array("files", 5), PhoneController.createPhone)
  .get("/get", authMiddleware, PhoneController.getPhones)
  .get("/get/:id", authMiddleware, PhoneController.getPhone)
  .delete("/delete/:id", authMiddleware, PhoneController.deletePhone)
  .post("/get/load", authMiddleware, PhoneController.loadPhones)
  .delete("/delete/all", authMiddleware, PhoneController.deletePhones)
  .put("/update", authMiddleware, PhoneController.updatePhone);

export default router;
