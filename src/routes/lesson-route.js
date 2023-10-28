import express from "express";
import lessonController from "../controller/lesson-controlle.js";

const lessonRoute = express.Router();

lessonRoute.post("/api/v1/lesson", lessonController.create);
lessonRoute.put("/api/v1/lesson/:id", lessonController.update);
lessonRoute.delete("/api/v1/lesson/:id", lessonController.remove);
lessonRoute.get("/api/v1/lesson", lessonController.get);
lessonRoute.get("/api/v1/lesson/:id", lessonController.getById);
lessonRoute.post("/api/v1/lesson/:id/submit", lessonController.submit);

export default lessonRoute;
